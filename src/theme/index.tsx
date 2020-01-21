import { useState, useEffect } from "react"
import { ThemeProvider } from "styled-components"

import { useMediaQuery } from "../hooks/useMediaQuery"
import { GlobalStyleDark, GlobalStyleLight } from "./GlobalStyles"
import { ModeContext } from "./ModeContext"

export const ColorSchemeProvider = ({ children }: any) => {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")
  const [isDarkMode, setIsDarkMode] = useState(prefersDark)
  useEffect(() => {
    setIsDarkMode(prefersDark)
  }, [prefersDark])

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        switch (e.keyCode) {
          case 68 /** "d" */:
            return setIsDarkMode(!isDarkMode)
          default:
            return
        }
      }
    }

    typeof window !== "undefined" &&
      window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [setIsDarkMode, isDarkMode])

  /** placeholder */
  const theme = isDarkMode
    ? { borderBottom: "#555", isDarkMode: true }
    : { borderBottom: "#aaa", isDarkMode: false }

  return (
    <ModeContext.Provider value={{ isDarkMode }}>
      <ThemeProvider theme={theme}>
        {isDarkMode ? <GlobalStyleDark /> : <GlobalStyleLight />}
        {children}
      </ThemeProvider>
    </ModeContext.Provider>
  )
}

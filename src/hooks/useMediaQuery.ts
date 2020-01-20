import { useEffect, useState } from "react"

/**
 * @usage `const sm_up = useMediaQuery('(min-width: 576px)');`
 *
 * @param {string} query

 * @returns {boolean} a true/false value for if the media query is matched or not
 */
export const useMediaQuery = (query: string) => {
  const [state, setState] = useState(false)
  useEffect(() => {
    const mediaQueryList: MediaQueryList = window?.matchMedia(query)
    const onChange = () => {
      setState(mediaQueryList.matches)
    }
    mediaQueryList.addListener(onChange)
    setState(mediaQueryList.matches)
    return () => {
      mediaQueryList.removeListener(onChange)
    }
  }, [query])
  return state
}

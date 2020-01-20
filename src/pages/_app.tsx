import { ColorSchemeProvider } from "../theme"

/**
 * ⚠️ Global CSS cannot be imported from files other than your Custom <App>.
 * Please move all global CSS imports to src/pages/_app.tsx.
 * Read more: https://err.sh/next.js/css-global
 */
import "../../global.css"

/**
 * @TODO type these!
 */
interface Props {
  Component: any
  pageProps: any
}

function MyApp({ Component, pageProps }: Props) {
  return (
    <ColorSchemeProvider>
      <Component {...pageProps} />
    </ColorSchemeProvider>
  )
}
export default MyApp

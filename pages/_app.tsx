import "../global.css"

/**
 * @TODO type these!
 */
interface Props {
  Component: any
  pageProps: any
}
function MyApp({ Component, pageProps }: Props) {
  return <Component {...pageProps} />
}

export default MyApp

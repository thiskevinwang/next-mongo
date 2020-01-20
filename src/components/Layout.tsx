import * as React from "react"
import Link from "next/link"
import Head from "next/head"
import styled from "styled-components"

const StickyNav = styled.nav`
  padding: 8px;
  position: sticky;
  top: 0;

  margin-left: -8px;
  margin-right: -8px;
  margin-top: -8px;
  background: var(${props => (props.theme.isDarkMode ? `--dark` : `--light`)});
  border-bottom: 1px solid
    var(${props => (props.theme.isDarkMode ? `--accents-6` : `--accents-3`)});
  /* box-shadow: var(--shadow-medium); */
  a {
    margin: 1rem;
  }
`

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "This is the default title",
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <h1>Unified Analytics</h1>
    </header>
    <StickyNav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/events">
        <a>Events</a>
      </Link>
      <Link href="/add">
        <a>Add</a>
      </Link>
    </StickyNav>

    {children}
    <footer>
      <span>🦶</span>
    </footer>
  </div>
)

export default Layout

import { createGlobalStyle } from "styled-components"

export const GlobalStyleLight = createGlobalStyle`
  body {
    /* font-family: Circular-Pro; */
    /* font-family: MercuryTextG4; */

    background-color: var(--light);
    transition: background-color 200ms ease-in-out;
    will-change: background-color;
  }
  h1, h2, h3, h4, h5, h6, span, div, p, b, i {
    color: var(--dark);
    transition: color 200ms ease-in-out;
    will-change: color;
  }
  a {
    color: var(--accents-5);
    transition: color 200ms ease-in-out;
    will-change: color;

    text-decoration: none;

    :hover {
      color: var(--accents-8);
    }
  }
  
  code {
    margin-right: 0.5rem;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    border-radius: 0.25rem;
    background: var(--accents-2);
    transition: background 200ms ease-in-out;
    will-change: background;
  }
`
export const GlobalStyleDark = createGlobalStyle`
  body {
    /* font-family: Circular-Pro; */
    /* font-family: MercuryTextG4; */

    background-color: var(--dark);
    transition: background-color 200ms ease-in-out;
    will-change: background-color;
  }
  h1, h2, h3, h4, h5, h6, span, div, p, b, i {
    color: var(--light);
    transition: color 200ms ease-in-out;
    will-change: color;
  }
  a {
    color: var(--accents-3);
    transition: color 200ms ease-in-out;
    will-change: color;

    text-decoration: none;

    :hover {
      color: var(--accents-1);
    }
  }
  code {
    margin-right: 0.5rem;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    border-radius: 0.25rem;
    background: var(--accents-7);
    transition: background 200ms ease-in-out;
    will-change: background;
  }
`

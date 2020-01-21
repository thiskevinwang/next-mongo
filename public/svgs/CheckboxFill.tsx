import styled from "styled-components"

const Svg = styled.svg`
  fill: var(${props => (props.theme.isDarkMode ? `--light` : `--dark`)});
`

/**
 * @TODO maybe this can be in /src vs. /public
 */
export const CheckboxFill = () => (
  <Svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    shapeRendering="geometricPrecision"
  >
    <path
      d="M7.91 3h8.18a4.908 4.908 0 014.31 2.554l-8.273 8.377-2.592-2.638a.75.75 0 10-1.07 1.05l3.125 3.182a.75.75 0 001.069.002l8.281-8.386c.04.25.06.507.06.768v8.182A4.909 4.909 0 0116.09 21H7.91A4.909 4.909 0 013 16.09V7.91A4.91 4.91 0 017.91 3z"
      stroke="none"
    />
  </Svg>
)

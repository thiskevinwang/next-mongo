import { Field } from "formik"
import styled from "styled-components"

import { Checkbox } from "../../../public/svgs/Checkbox"
import { CheckboxFill } from "../../../public/svgs/CheckboxFill"

const StyledField = styled(Field)`
  /** styles just for the checkbox icon */
  margin-right: 0.5rem;
  opacity: 0;

  /** @TODO iron this out */
  /** clickability is poor */
  :focus + span svg {
    outline-color: var(--accents-4);
    outline-style: solid;
    outline-width: 2px;
    outline-offset: -2px;
  }
`

export const CheckboxInput = (props: any) => {
  return (
    <span style={{ position: "relative" }}>
      <StyledField {...props} />
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: `none`,
        }}
      >
        {props.checked ? <CheckboxFill /> : <Checkbox />}
      </span>
    </span>
  )
}

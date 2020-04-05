// @flow weak

import React from "react"
import { styled } from "@material-ui/core/styles"
import * as colors from "@material-ui/core/colors"

const OuterContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
})
const InnerContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  maxWidth: 1200,
  width: "100%",
  minHeight: "100vh",
  padding: 16,
})

export default ({ children }) => {
  return (
    <OuterContainer>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  )
}

// @flow weak

import React from "react"
import { styled } from "@material-ui/core/styles"
import * as colors from "@material-ui/core/colors"

const Container = styled("div")({
  border: `4px solid ${colors.red[800]}`,
  borderRadius: 5,
  backgroundColor: colors.red[500],
  color: "#fff",
  padding: 16,
  marginTop: 16,
  fontSize: 24,
  fontWeight: "bold",
})

export const ErrorBox = ({ error }) => {
  if (!error) return null
  return <Container>{error}</Container>
}

export default ErrorBox

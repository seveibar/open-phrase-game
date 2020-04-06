import React from "react"
import Button from "@material-ui/core/Button"
import { styled } from "@material-ui/core/styles"
import * as colors from "@material-ui/core/colors"
import { useBackgroundColor } from "../ColorProvider"

const StyledButton = styled(Button)(({ colorPalette }) => ({
  marginTop: 42,
  marginLeft: 4,
  marginRight: 4,
  fontSize: 24,
  height: 82,
  textTransform: "none",
  fontWeight: "bold",
  backgroundColor: colorPalette[600],
  color: "#fff",
  borderRadius: 64,
  border: `4px solid ${colorPalette[800]}`,
  boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
  "&:hover": {
    backgroundColor: colorPalette[800],
  },
}))

export default (props) => {
  const backgroundColor = useBackgroundColor()
  return <StyledButton {...props} colorPalette={backgroundColor} />
}

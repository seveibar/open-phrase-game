// @flow weak

import React from "react"
import { styled } from "@material-ui/core/styles"
import * as colors from "@material-ui/core/colors"
import backgroundImage from "../../images/bg-black-white.jpg"
import { useBackgroundColor } from "../ColorProvider"

const RootContainer = styled("div")(({ color = colors.blue[100] }) => ({
  position: "relative",
  "&::after": {
    content: '""',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    zIndex: -2,
    backgroundColor: color,
  },
}))
const OuterContainer = styled("div")({
  position: "relative",
  display: "flex",
  justifyContent: "center",
})
const BGImage = styled("div")({
  position: "absolute",
  opacity: 0.02,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundImage: `url(${backgroundImage})`,
})
const InnerContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  maxWidth: 1200,
  width: "100%",
  minHeight: "100vh",
})

export default ({ children }) => {
  const backgroundColor = useBackgroundColor()
  return (
    <RootContainer color={backgroundColor[50]}>
      <BGImage />
      <OuterContainer>
        <InnerContainer>{children}</InnerContainer>
      </OuterContainer>
    </RootContainer>
  )
}

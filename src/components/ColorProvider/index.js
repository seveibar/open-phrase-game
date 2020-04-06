// @flow weak

import React, { createContext, useContext } from "react"
import * as colors from "@material-ui/core/colors"

const ColorContext = createContext(colors.blue)

export const useBackgroundColor = () => useContext(ColorContext)

export default ({ children, currentColor }) => {
  return (
    <ColorContext.Provider value={currentColor}>
      {children}
    </ColorContext.Provider>
  )
}

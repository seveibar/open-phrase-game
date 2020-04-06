// @flow weak

import * as colors from "@material-ui/core/colors"

export const backgroundColors = [
  colors.blue,
  colors.pink,
  colors.purple,
  colors.indigo,
  colors.teal,
  colors.green,
  colors.deepOrange,
]

export default (index) => {
  return backgroundColors[index % backgroundColors.length]
}

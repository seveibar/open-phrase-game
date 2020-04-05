// @flow weak

import React from "react"

import monocle from "../../images/1F9D0_color.png"
import smile1 from "../../images/1F60A_color.png"
import smile2 from "../../images/1F92A_color.png"
import smile3 from "../../images/1F601_color.png"
import smile4 from "../../images/1F603_color.png"
import smile5 from "../../images/1F604_color.png"
import smile6 from "../../images/1F606_color.png"
import smile7 from "../../images/1F638_color.png"
import smile8 from "../../images/1F643_color.png"
import smile9 from "../../images/1F923_color.png"
import smile10 from "../../images/1F924_color.png"
import smile11 from "../../images/1F928_color.png"
import smile12 from "../../images/1F970_color.png"
import smile13 from "../../images/1F975_color.png"

const emojiSrcs = [
  monocle,
  smile1,
  smile2,
  smile3,
  smile4,
  smile5,
  smile6,
  smile7,
  smile8,
  smile9,
  smile10,
  smile11,
  smile12,
  smile13,
]

export default ({ index, ...props }) => {
  return <img {...props} src={emojiSrcs[index % emojiSrcs.length]} />
}

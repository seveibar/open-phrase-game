import React from "react"
import EnterCodePage from "./"
import { action } from "@storybook/addon-actions"

export default {
  title: "EnterCodePage",
  component: EnterCodePage,
}

export const Example1 = () => (
  <EnterCodePage onClickPlay={action("onClickPlay")} />
)

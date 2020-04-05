import React from "react"
import EnterResponsePage from "./"
import { action } from "@storybook/addon-actions"

export default {
  title: "EnterResponsePage",
  component: EnterResponsePage,
}

export const Example1 = () => (
  <EnterResponsePage
    question="The favorite poem of John Doe:"
    timeLeft={2550}
    onClickDone={action("onClickDone")}
  />
)

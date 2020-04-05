import React from "react"
import WaitingRoomPage from "./"
import { action } from "@storybook/addon-actions"

export default {
  title: "WaitingRoomPage",
  component: WaitingRoomPage,
}

export const Example1 = () => (
  <WaitingRoomPage
    myPlayer={{ name: "Player One", id: 1, isHost: true }}
    players={[
      {
        name: "Player One",
        id: 1,
        isHost: true,
      },
      {
        name: "Player Two",
        id: 2,
      },
      {
        name: "Player Three",
        id: 3,
      },
    ]}
    onClickStartGame={action("onClickStartGame")}
  />
)

export const Example2 = () => (
  <WaitingRoomPage
    myPlayer={{ name: "Player Two", id: 2 }}
    players={[
      {
        name: "Player One",
        id: 1,
        isHost: true,
      },
      {
        name: "Player Two",
        id: 2,
      },
      {
        name: "Player Three",
        id: 3,
      },
    ]}
  />
)

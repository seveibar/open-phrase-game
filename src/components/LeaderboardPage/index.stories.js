import React from "react"
import LeaderboardPage from "./"
import { action } from "@storybook/addon-actions"

export default {
  title: "LeaderboardPage",
  component: LeaderboardPage,
}

export const Example1 = () => (
  <LeaderboardPage
    myPlayer={{ name: "Player One", id: 1, isHost: true }}
    revealed={false}
    players={[
      {
        name: "Player One",
        id: 1,
        isHost: true,
        playerScore: 1,
      },
      {
        name: "Player Two",
        id: 2,
        playerScore: 5,
      },
      {
        name: "Player Three",
        id: 3,
        playerScore: 3,
      },
    ]}
    onPlayAgain={action("onPlayAgain")}
  />
)

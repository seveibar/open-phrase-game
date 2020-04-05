import React from "react"
import VotePage from "./"
import { action } from "@storybook/addon-actions"

export default {
  title: "VotePage",
  component: VotePage,
}

export const Example1 = () => (
  <VotePage
    myPlayer={{ name: "Player One", id: 1, isHost: true }}
    revealed={false}
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
    answers={[
      {
        playerId: 1,
        id: 1,
        response: "Jane doe!",
      },
      {
        playerId: 1,
        id: 2,
        response: "Something funny!",
      },
    ]}
    onVote={action("onVote")}
    timeLeft={4500}
  />
)

export const Example2 = () => (
  <VotePage
    myPlayer={{ name: "Player One", id: 1, isHost: true }}
    revealed
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
      {
        name: "Player Four",
        id: 4,
      },
      {
        name: "Player Five",
        id: 5,
      },
    ]}
    answers={[
      {
        playerId: 1,
        id: 1,
        response: "Jane doe!",
        playerVotes: [3],
      },
      {
        playerId: 1,
        id: 2,
        response: "Something funny!",
        playerVotes: [4, 5],
      },
    ]}
    onVote={action("onVote")}
    timeLeft={4500}
  />
)

import React from "react"
import VotePage from "./"
import { action } from "@storybook/addon-actions"

export default {
  title: "VotePage",
  component: VotePage,
}

export const Example1 = () => (
  <VotePage
    myPlayer={{ name: "Player One", id: 1, host: true }}
    revealed={false}
    players={[
      {
        name: "Player One",
        id: 1,
        host: true,
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
    participants={[1, 2]}
    playerAnswers={{
      1: {
        response: "Jane doe!",
        voters: [3],
        answerId: 1,
      },
      2: {
        response: "Something else!",
        voters: [],
        answerId: 2,
      },
    }}
    onVote={action("onVote")}
    timeLeft={4500}
  />
)

export const Example2 = () => (
  <VotePage
    myPlayer={{ name: "Player One", id: 1, host: true }}
    revealed
    players={[
      {
        name: "Player One",
        id: 1,
        host: true,
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
    participants={[1, 2]}
    playerAnswers={{
      1: {
        response: "Jane doe!",
        voters: [3],
        answerId: 1,
      },
      2: {
        response: "Something else!",
        voters: [],
        answerId: 2,
      },
    }}
    onVote={action("onVote")}
    timeLeft={4500}
  />
)

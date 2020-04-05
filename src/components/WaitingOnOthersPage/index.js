import React from "react"
import { styled } from "@material-ui/core/styles"
import PageContainer from "../PageContainer"
import Button from "@material-ui/core/Button"

export default ({ players, myPlayer, finishedPlayers, timeLeft }) => {
  const secondsLeft = Math.floor(timeLeft / 1000)
  return (
    <PageContainer>
      <div>
        <h2>{secondsLeft} seconds left!</h2>
        {players.map((player) => (
          <div key={player.id}>
            {player.name}
            {finishedPlayers.includes(player.id) ? " (done)" : ""}
            {player.host ? " (host)" : ""}
          </div>
        ))}
      </div>
    </PageContainer>
  )
}

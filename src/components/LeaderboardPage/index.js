import React from "react"
import { styled } from "@material-ui/core/styles"
import PageContainer from "../PageContainer"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"

export default ({ myPlayer, players, onPlayAgain }) => {
  const sortedPlayers = [...players]
  sortedPlayers.sort((a, b) => b.playerScore - a.playerScore)
  return (
    <PageContainer>
      <h1>Leaderboard</h1>
      {sortedPlayers.map((player) => (
        <div key={player.id}>
          {player.name} ({player.playerScore})
        </div>
      ))}
      {myPlayer.isHost && <Button onClick={onPlayAgain}>Play Again</Button>}
    </PageContainer>
  )
}

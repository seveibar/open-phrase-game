import React from "react"
import { styled } from "@material-ui/core/styles"
import PageContainer from "../PageContainer"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"

export default ({ myPlayer, players, onPlayAgain }) => {
  const sortedPlayers = [...players]
  sortedPlayers.sort((a, b) => b.score - a.score)
  return (
    <PageContainer>
      <h1>Leaderboard</h1>
      {sortedPlayers.map((player) => (
        <div key={player.id}>
          {player.name} ({player.score})
        </div>
      ))}
      {myPlayer.host && <Button onClick={onPlayAgain}>Play Again</Button>}
    </PageContainer>
  )
}

import React from "react"
import { styled } from "@material-ui/core/styles"
import PageContainer from "../PageContainer"
import Button from "@material-ui/core/Button"

export default ({ players, myPlayer, onClickStartGame, code }) => {
  return (
    <PageContainer>
      <h1>Waiting Room (Code: {code})</h1>
      <div>
        {players.map((player) => (
          <div key={player.id}>
            {player.name}
            {player.host ? " (host)" : ""}
          </div>
        ))}
      </div>
      {Boolean(myPlayer.host) && (
        <Button onClick={onClickStartGame} disabled={players.length < 3}>
          Start Game
        </Button>
      )}
    </PageContainer>
  )
}

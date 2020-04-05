import React from "react"
import { styled } from "@material-ui/core/styles"
import PageContainer from "../PageContainer"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"

const ResponseText = styled("div")({
  fontSize: 24,
})

export default ({ myPlayer, players, answers, onVote, timeLeft, revealed }) => {
  const secondsLeft = Math.floor(timeLeft / 1000)

  return (
    <PageContainer>
      <h1>Vote for the best answer!</h1>
      <h2>You have {secondsLeft} seconds left!</h2>
      <Grid container>
        {answers.map((answer, answerIndex) => (
          <Grid key={answer.answerId} item xs={6}>
            <h2>Response {answerIndex + 1}</h2>
            <ResponseText>{answer.response}</ResponseText>
            {!revealed && (
              <Button onClick={() => onVote(answer.id)}>Vote</Button>
            )}
            {revealed && (
              <>
                <h3>{answer.playerVotes.length} Votes </h3>
                {players
                  .filter((p) => answer.playerVotes.includes(p.id))
                  .map((player) => (
                    <div>{player.name}</div>
                  ))}
              </>
            )}
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  )
}

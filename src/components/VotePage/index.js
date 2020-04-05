import React from "react"
import { styled } from "@material-ui/core/styles"
import PageContainer from "../PageContainer"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"

const ResponseText = styled("div")({
  fontSize: 24,
})

export default ({
  myPlayer,
  players,
  playerVotes,
  participants,
  playerAnswers,
  onVote,
  timeLeft,
  revealed,
}) => {
  const secondsLeft = Math.floor(timeLeft / 1000)

  if (!participants || !playerAnswers) return null

  const answers: Array<{
    playerId: string | number,
    voters: Array<{}>,
    response: string,
  }> = participants.map((playerId) => ({
    playerId,
    ...playerAnswers[playerId],
  }))

  const canVote =
    !participants.includes(myPlayer.id) &&
    !answers.some((ans) => (ans.voters || []).includes(myPlayer.id))

  return (
    <PageContainer>
      {revealed ? (
        <h1>This is how people voted!</h1>
      ) : canVote ? (
        <h1>Vote for the best answer!</h1>
      ) : (
        <h1>Wait for players to vote</h1>
      )}
      {!revealed && canVote ? (
        <h2>You have {secondsLeft} seconds left!</h2>
      ) : (
        <h2>{secondsLeft} seconds until next question</h2>
      )}
      <Grid container>
        {answers.map((answer, answerIndex) => (
          <Grid key={answer.answerId} item xs={6}>
            <h2>Response {answerIndex + 1}</h2>
            <ResponseText>{answer.response}</ResponseText>
            {!revealed && canVote && (
              <Button onClick={() => onVote(answer.answerId)}>Vote</Button>
            )}
            {revealed && answer.voters && (
              <>
                <h3>{answer.voters.length} Votes </h3>
                {players
                  .filter((p) => answer.voters.includes(p.id))
                  .map((player) => (
                    <div key={player.id}>{player.name}</div>
                  ))}
              </>
            )}
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  )
}

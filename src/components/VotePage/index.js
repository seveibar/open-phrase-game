import React from "react"
import { styled } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import PageContainer from "../PageContainer"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import * as colors from "@material-ui/core/colors"
import { useBackgroundColor } from "../ColorProvider"
import { backgroundColors } from "../../lib/get-background-color.js"
import seedrandom from "seedrandom"
import Face from "../Face"

const StyledButton = styled(Button)(({ colorPalette }) => ({
  fontSize: 24,
  textTransform: "none",
  margin: 8,
  padding: 12,
  paddingLeft: 24,
  paddingRight: 24,
  fontWeight: "bold",
  backgroundColor: colorPalette[600],
  border: `5px solid ${colorPalette[800]}`,
  borderRadius: 8,
  color: "#fff",
  "&:hover": {
    backgroundColor: colorPalette[800],
  },
}))

const TitleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  fontSize: 36,
  fontWeight: 600,
  backgroundColor: colors.blue[700],
  color: "#fff",
  padding: 32,
})
const Title = styled("div")({})
const TimeLeft = styled("div")({})
const Author = styled("div")(({ color }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: color[800],
  marginTop: 32,
  borderRadius: 8,
  "& .face": {
    width: 86,
    height: 86,
  },
  "& .name": {},
}))

const QuestionBoxContainer = styled("div")({
  display: "flex",
  padding: 32,
  justifyContent: "center",
})
const QuestionBox = styled("div")(({ color }) => ({
  backgroundColor: color[700],
  display: "inline-flex",
  padding: 32,
  color: "#fff",
  fontWeight: "bold",
  borderRadius: 8,
  border: `5px solid ${color[900]}`,
  fontSize: 32,
  textAlign: "center",
}))

const ResponseText = styled("div")(({ color }) => ({
  fontSize: 24,
  margin: 16,
  padding: 32,
  fontWeight: "bold",
  backgroundColor: color[600],
  border: `5px solid ${color[800]}`,
  borderRadius: 8,
  color: "#fff",
}))

const VoterContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
})

const Voter = styled("div")(({ color }) => ({
  display: "inline-flex",
  backgroundColor: color[600],
  border: `2px solid ${color[800]}`,
  color: "#fff",
  margin: 8,
  alignItems: "center",
  borderRadius: 8,
  "& .face": {
    width: 64,
    height: 64,
  },
  "& .name": {
    paddingRight: 16,
    fontWeight: "bold",
  },
}))

export default ({
  myPlayer,
  players,
  playerVotes,
  participants,
  playerAnswers,
  questionText,
  onVote,
  timeLeft,
  revealed,
}) => {
  const secondsLeft = Math.floor(timeLeft / 1000)

  const backgroundColor = useBackgroundColor()
  let accentColors = [...backgroundColors].filter(
    (bgc) => bgc !== backgroundColor
  )
  const rng = seedrandom(questionText)
  accentColors.sort((a, b) => rng() - 0.5)

  if (!participants || !playerAnswers) return null

  const answers: Array<{
    playerId: string | number,
    voters: Array<{}>,
    response: string,
  }> = participants.map((playerId) => ({
    playerId,
    player: players.find((p) => p.id === playerId),
    ...playerAnswers[playerId],
  }))

  const canVote =
    !participants.includes(myPlayer.id) &&
    !answers.some((ans) => (ans.voters || []).includes(myPlayer.id))

  return (
    <PageContainer>
      <TitleContainer
        style={{
          backgroundColor: backgroundColor[700],
        }}
      >
        <Title>
          {revealed
            ? "This is how people voted!"
            : canVote
            ? "Vote for the best answer!"
            : "Wait for players to vote"}
        </Title>
        <TimeLeft>{Math.max(0, secondsLeft)} seconds left</TimeLeft>
      </TitleContainer>
      <QuestionBoxContainer>
        <QuestionBox color={backgroundColor}>{questionText}</QuestionBox>
      </QuestionBoxContainer>
      <Grid container>
        {answers.map((answer, answerIndex) => (
          <Grid key={answer.answerId} item xs={6}>
            <ResponseText color={accentColors[answerIndex]}>
              {answer.response}
              {revealed && (
                <Author color={accentColors[answerIndex]}>
                  <Face className="face" index={answer.player.id} />
                  <div className="name">{answer.player.name}</div>
                </Author>
              )}
            </ResponseText>
            {!revealed && canVote && (
              <Box textAlign="center">
                <StyledButton
                  colorPalette={accentColors[answerIndex]}
                  onClick={() => onVote(answer.answerId)}
                >
                  Vote
                </StyledButton>
              </Box>
            )}
            {revealed && answer.voters && (
              <VoterContainer>
                {/* <h3>{answer.voters.length} Votes </h3> */}
                {players
                  .filter((p) => answer.voters.includes(p.id))
                  .map((player, playerIndex) => (
                    <Voter
                      color={accentColors[2 + playerIndex]}
                      key={player.id}
                    >
                      <Face className="face" index={player.id} />
                      <div className="name">{player.name}</div>
                    </Voter>
                  ))}
              </VoterContainer>
            )}
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  )
}

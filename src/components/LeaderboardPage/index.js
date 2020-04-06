import React, { useEffect } from "react"
import { styled } from "@material-ui/core/styles"
import PageContainer from "../PageContainer"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import * as colors from "@material-ui/core/colors"
import { useBackgroundColor } from "../ColorProvider"
import Face from "../Face"
import BigButton from "../BigButton"
import ConfettiGenerator from "confetti-js"

const TitleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  fontSize: 36,
  fontWeight: 600,
  backgroundColor: colors.blue[700],
  color: "#fff",
  padding: 32,
})
const Title = styled("div")({
  color: "rgba(255,255,255,0.7)",
  "& b": { color: "#fff" },
})

const PlayerContainer = styled("div")({
  display: "flex",
  backgroundColor: "#fff",
  borderRadius: 64,
  color: colors.grey[800],
  fontSize: 24,
  alignItems: "center",
  fontWeight: "bold",
  marginTop: 32,
  border: `2px solid rgba(0,0,0,0.8)`,
  boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
  "& .name": {
    paddingLeft: 8,
  },
  "& .ranking": {
    marginLeft: 16,
    backgroundColor: colors.blue[700],
    padding: 16,
    color: "#fff",
    borderRadius: 48,
  },
  "& .score": {
    marginRight: 32,
    color: colors.blue[700],
  },
})

const ContentContainer = styled("div")({
  padding: 16,
  display: "flex",
  flexDirection: "column",
})

const StyledFace = styled(Face)({
  marginTop: 8,
  marginLeft: 8,
  width: 72,
  height: 72,
})

const WinnerBox = styled("div")({
  textAlign: "center",
  "& .face": {
    width: 400,
    height: 400,
  },
})

const StyledCanvas = styled("canvas")({
  position: "fixed",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  pointerEvents: "none",
})

export default ({ myPlayer, players, onPlayAgain }) => {
  const sortedPlayers = [...players]
  sortedPlayers.sort((a, b) => b.score - a.score)
  const backgroundColor = useBackgroundColor()
  useEffect(() => {
    const confetti = new ConfettiGenerator({
      target: "confetti-canvas",
      size: 2,
    })
    confetti.render()
    return () => confetti.clear()
  }, [])
  return (
    <PageContainer>
      <TitleContainer style={{ backgroundColor: backgroundColor[700] }}>
        <Title>
          The Winner is: <b>{sortedPlayers[0].name}!</b>
        </Title>
      </TitleContainer>
      <ContentContainer>
        <WinnerBox>
          <Face className="face" index={sortedPlayers[0].id} />
        </WinnerBox>
        {sortedPlayers.map((player, playerIndex) => (
          <PlayerContainer key={player.id}>
            <div className="ranking">#{playerIndex + 1}</div>
            <div>
              <StyledFace index={player.id} />
            </div>
            <div className="name">
              {player.name}
              {player.host ? " (host)" : ""}
            </div>
            <Box flexGrow={1} />
            <div className="score">{player.score * 250}</div>
          </PlayerContainer>
        ))}
        {myPlayer.host && (
          <BigButton onClick={onPlayAgain}>Play Again</BigButton>
        )}
      </ContentContainer>
      <StyledCanvas id="confetti-canvas" />
    </PageContainer>
  )
}

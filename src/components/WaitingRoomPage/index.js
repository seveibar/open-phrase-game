import React from "react"
import { styled } from "@material-ui/core/styles"
import PageContainer from "../PageContainer"
import Button from "@material-ui/core/Button"
import Face from "../Face"
import * as colors from "@material-ui/core/colors"

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
const WaitingRoomCode = styled("div")({
  "& b": { fontWeight: 900 },
})
const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: 16,
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
})

const StyledButton = styled(Button)({
  marginTop: 42,
  marginLeft: 4,
  marginRight: 4,
  fontSize: 24,
  height: 82,
  textTransform: "none",
  fontWeight: "bold",
  backgroundColor: colors.blue[600],
  color: "#fff",
  borderRadius: 64,
  border: `2px solid rgba(0,0,0,0.8)`,
  boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
  "&:hover": {
    backgroundColor: colors.blue[800],
  },
})

const StyledFace = styled(Face)({
  marginTop: 8,
  marginLeft: 8,
  width: 72,
  height: 72,
})

export default ({ players, myPlayer, onClickStartGame, code }) => {
  return (
    <PageContainer backgroundIndex={0}>
      <TitleContainer>
        <Title>Waiting Room</Title>
        <WaitingRoomCode>
          Enter <b>{code}</b> to join the Room!
        </WaitingRoomCode>
      </TitleContainer>
      <Content>
        <div>
          {players.map((player, playerIndex) => (
            <PlayerContainer key={player.id}>
              <div>
                <StyledFace index={playerIndex} />
              </div>
              <div className="name">
                {player.name}
                {player.host ? " (host)" : ""}
              </div>
            </PlayerContainer>
          ))}
        </div>
        <StyledButton
          onClick={onClickStartGame}
          disabled={players.length < 3 || !myPlayer.host}
        >
          {!myPlayer.host
            ? "Waiting for host to start game"
            : `Start Game${
                players.length < 3 ? " (need atleast 3 players)" : ""
              }`}
        </StyledButton>
      </Content>
    </PageContainer>
  )
}

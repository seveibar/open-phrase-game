// @flow weak

import React, { useState, useEffect } from "react"
import EnterCodePage from "./components/EnterCodePage"
import WaitingRoomPage from "./components/WaitingRoomPage"
import WaitingOnOthersPage from "./components/WaitingOnOthersPage"
import LeaderboardPage from "./components/LeaderboardPage"
import EnterResponsePage from "./components/EnterResponsePage"
import VotePage from "./components/VotePage"
import { useLocalStorage } from "react-use"
import useEventCallback from "use-event-callback"

const VOTE_TIME = 3000 // 10000
const REVEAL_TIME = 1000 // 10000
const ANSWER_TIME = 60000

function App() {
  const [roomId, changeRoomId] = useState()
  const [gameState, changeGameState] = useState()
  const [playerName, changePlayerName] = useLocalStorage()
  const [myPlayer, changeMyPlayer] = useState()

  const isHost = myPlayer && myPlayer.host

  const callAPI = useEventCallback(async (url, body) => {
    const newGameState = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room_id: roomId, ...body }),
    }).then((r) => r.json())
    if (roomId !== newGameState.roomId) {
      changeRoomId(newGameState.roomId)
      changeMyPlayer(newGameState.players.find((p) => p.name === body.name))
    }
    changeGameState(newGameState)
  })

  let timeSinceStateChange, currentRound, currentRoundType
  try {
    timeSinceStateChange = Date.now() - gameState.lastStartTime
    currentRound = gameState.rounds[gameState.currentRoundNumber]
    currentRoundType = gameState.roundTypes[gameState.currentRoundNumber]
  } catch (e) {}

  useEffect(() => {
    if (!gameState || !currentRound) return
    if (currentRoundType === "pairs") {
      if (
        gameState.currentMatchNumber === 0 &&
        timeSinceStateChange > ANSWER_TIME
      ) {
        callAPI("/api/nextmatch", {})
      } else if (
        gameState.currentMatchNumber > 0 &&
        timeSinceStateChange > VOTE_TIME + REVEAL_TIME
      ) {
        if (gameState.currentMatchNumber >= currentRound.matches.length) {
          callAPI("/api/nextround", {})
        } else {
          callAPI("/api/nextmatch", {})
        }
      } else if (gameState.currentMatchNumber === 0) {
        const everyoneFinishedAnswering = gameState.players.every(
          (p) =>
            !currentRound.matches.some(
              (m) => m.participants.includes(p.id) && !m.playerAnswers[p.id]
            )
        )
        if (everyoneFinishedAnswering) {
          callAPI("/api/nextmatch", {})
        }
      } else if (gameState.currentMatchNumber > 0) {
        const currentMatchIndex = gameState.currentMatchNumber - 1
        const currentMatch = currentRound.matches[currentMatchIndex]

        // check if everyone voted
        if (
          currentMatch &&
          currentMatch.playerVotes.length + currentMatch.participants.length >=
            gameState.players.length
        ) {
          // TODO Accelerate the time (no way to do this via api currently)
        }
      }
    }
  }, [currentRound, timeSinceStateChange])

  useEffect(() => {
    if (!roomId) return
    const interval = setInterval(() => callAPI("/api/gamestate", {}), 500)
    return () => clearInterval(interval)
  }, [roomId])

  if (!roomId) {
    return (
      <EnterCodePage
        defaultName={playerName}
        onClickHost={async ({ name }) => {
          callAPI("/api/host", { name })
          changePlayerName(name)
        }}
        onClickJoin={async (fields) => {
          callAPI("/api/join", fields)
          changePlayerName(fields.name)
        }}
      />
    )
  }

  switch (currentRoundType) {
    case "waiting": {
      return (
        <WaitingRoomPage
          players={gameState.players}
          myPlayer={myPlayer}
          onClickStartGame={() => callAPI("/api/nextround", {})}
          code={gameState.code}
        />
      )
    }
    case "pairs": {
      if (gameState.currentMatchNumber === 0) {
        const currentMatch = currentRound.matches.find(
          (m) =>
            m.participants.includes(myPlayer.id) &&
            !m.playerAnswers[myPlayer.id]
        )

        if (!currentMatch)
          return (
            <WaitingOnOthersPage
              timeLeft={ANSWER_TIME - timeSinceStateChange}
              players={gameState.players}
              myPlayer={myPlayer}
              finishedPlayers={gameState.players
                .filter(
                  (p) =>
                    !currentRound.matches.some(
                      (m) =>
                        m.participants.includes(p.id) && !m.playerAnswers[p.id]
                    )
                )
                .map((p) => p.id)}
            />
          )

        return (
          <EnterResponsePage
            question={currentMatch.questionText}
            timeLeft={ANSWER_TIME - timeSinceStateChange}
            onClickDone={(response) => {
              callAPI("/api/answer", {
                response,
                match_id: currentMatch.matchId,
                creator_player_id: myPlayer.id,
              })
            }}
          />
        )
      } else {
        const currentMatchIndex = gameState.currentMatchNumber - 1
        const currentMatch = currentRound.matches[currentMatchIndex]
        return (
          <VotePage
            {...currentMatch}
            myPlayer={myPlayer}
            players={gameState.players}
            timeLeft={
              timeSinceStateChange < VOTE_TIME
                ? VOTE_TIME - timeSinceStateChange
                : REVEAL_TIME + VOTE_TIME - timeSinceStateChange
            }
            revealed={timeSinceStateChange > VOTE_TIME}
            onVote={(answer_id) =>
              callAPI("/api/vote", { answer_id, voting_player_id: myPlayer.id })
            }
          />
        )
      }
    }
    case "finish": {
      return (
        <LeaderboardPage
          myPlayer={myPlayer}
          onPlayAgain={() => {
            // TODO
          }}
          players={gameState.players}
        />
      )
    }
  }

  return null
}

export default App

// @flow weak

import React, { useState, useEffect } from "react"
import EnterCodePage from "./components/EnterCodePage"
import WaitingRoomPage from "./components/WaitingRoomPage"
import { useLocalStorage } from "react-use"
import useEventCallback from "use-event-callback"

function App() {
  const [roomId, changeRoomId] = useState()
  const [gameState, changeGameState] = useState()
  const [playerName, changePlayerName] = useLocalStorage()
  const [myPlayer, changeMyPlayer] = useState()

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
          changePlayerName(name)
          callAPI("/api/host", { name })
        }}
        onClickJoin={async (fields) => {
          changePlayerName(fields.name)
          callAPI("/api/join", fields)
        }}
      />
    )
  }

  if (!gameState) return null

  if (gameState.currentRoundNumber === 0) {
    return (
      <WaitingRoomPage
        players={gameState.players}
        myPlayer={myPlayer}
        onClickStartGame={() => callAPI("/api/nextround", {})}
        code={gameState.code}
      />
    )
  }

  return null
}

export default App

// @flow weak

import React, { useState } from "react"
import { styled } from "@material-ui/core/styles"
import PageContainer from "../PageContainer"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

export default ({ question, timeLeft, onClickDone }) => {
  const [response, changeResponse] = useState("")
  const secondsLeft = Math.floor(timeLeft / 1000)
  return (
    <PageContainer>
      <h1>Enter Your Response (you have {secondsLeft} seconds left)</h1>
      <h2>{question}</h2>
      <TextField
        label="Your Response"
        variant="outlined"
        margin="normal"
        onChange={(e) => changeResponse(e.target.value)}
      />
      <Button onClick={() => onClickDone(response)}>Done</Button>
    </PageContainer>
  )
}

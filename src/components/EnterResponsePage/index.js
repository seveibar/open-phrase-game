// @flow weak

import React, { useState } from "react"
import { styled } from "@material-ui/core/styles"
import PageContainer from "../PageContainer"
import TextField from "@material-ui/core/TextField"
import BigButton from "../BigButton"
import * as colors from "@material-ui/core/colors"
import { useBackgroundColor } from "../ColorProvider"

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

const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: 32,
})
const StyledTextArea = styled("textarea")(({ color }) => ({
  fontSize: 32,
  borderRadius: 16,
  padding: 16,
  fontFamily: "Inter",
  fontWeight: "bold",
  color: colors.grey[800],
  height: "4em",
  border: `5px solid ${color}`,
}))

export default ({ question, timeLeft, onClickDone }) => {
  const [response, changeResponse] = useState("")
  const secondsLeft = Math.floor(timeLeft / 1000)
  const backgroundColor = useBackgroundColor()
  return (
    <PageContainer>
      <TitleContainer
        style={{
          backgroundColor: backgroundColor[700],
        }}
      >
        <Title>Enter Your Response</Title>
        <TimeLeft>{Math.max(0, secondsLeft)} seconds left</TimeLeft>
      </TitleContainer>
      <QuestionBoxContainer>
        <QuestionBox color={backgroundColor}>{question}</QuestionBox>
      </QuestionBoxContainer>
      <Content>
        <StyledTextArea
          color={backgroundColor[700]}
          key={question}
          placeholder="Enter your response here"
          variant="outlined"
          margin="normal"
          onChange={(e) => changeResponse(e.target.value)}
        />
        <BigButton onClick={() => onClickDone(response)}>Done</BigButton>
      </Content>
    </PageContainer>
  )
}

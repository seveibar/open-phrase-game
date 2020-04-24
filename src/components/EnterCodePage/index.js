// @flow weak

import React, { useReducer } from "react"
import { styled } from "@material-ui/core/styles"
import PageContainer from "../PageContainer"
import TextField from "@material-ui/core/TextField"
import Button from "../BigButton"
import * as colors from "@material-ui/core/colors"
import ErrorBox from "../ErrorBox"
import { useBackgroundColor } from "../ColorProvider"

const TitleContainer = styled("div")({
  color: "#fff",
  margin: 32,
})
const Title = styled("div")(({ bg }) => ({
  fontSize: 72,
  textAlign: "center",
  padding: 16,
  marginTop: 32,
  fontFamily: "Knewave",
  color: "#fff",
  letterSpacing: "0.1em",
  // textShadow: `0px 0px 3px ${bg[800]}, 0px 0px 9px ${bg[800]}, 0px 0px 9px ${bg[800]}, 0px 0px 9px ${bg[800]}`,
  "-webkit-text-stroke": `1px ${bg[800]}`,
  textShadow: `5px 5px 0 ${bg[800]},
     -2px -2px 0 ${bg[800]},
      2px -2px 0 ${bg[800]},
      -2px 2px 0 ${bg[800]},
       2px 2px 0 ${bg[800]}`,
}))
const Subtitle = styled("div")(({ bg }) => ({
  fontSize: 32,
  color: "#fff",
  fontFamily: "Knewave",
  textAlign: "center",
  "-webkit-text-stroke": `1px ${bg[800]}`,
  textShadow: `2px 2px 0 ${bg[800]},
     -1px -1px 0 ${bg[800]},
      1px -1px 0 ${bg[800]},
      -1px 1px 0 ${bg[800]},
       1px 1px 0 ${bg[800]}`,
}))

const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: 32,
})

export default ({ onClickJoin, defaultName, onClickHost, error }) => {
  const [fields, changeField] = useReducer(
    (fields, [field, val]) => ({ ...fields, [field]: val }),
    {
      code: "",
      name: defaultName,
    }
  )

  const bg = useBackgroundColor()

  return (
    <PageContainer backgroundIndex={0}>
      <TitleContainer>
        <Title bg={bg}>wordy.games</Title>
        <Subtitle bg={bg}>A funny phrase game for friends and family</Subtitle>
      </TitleContainer>
      <Content>
        <TextField
          label="Name"
          margin="normal"
          defaultValue={defaultName}
          variant="outlined"
          inputProps={{
            style: { fontSize: 48, backgroundColor: "#fff" },
          }}
          onChange={(e) => changeField(["name", e.target.value])}
        />
        <TextField
          label="Code"
          margin="normal"
          variant="outlined"
          inputProps={{
            style: { fontSize: 48, backgroundColor: "#fff" },
          }}
          onChange={(e) => changeField(["code", e.target.value])}
        />
        <ErrorBox error={error} />
        <Button onClick={() => onClickJoin(fields)}>Join Game</Button>
        <Button onClick={() => onClickHost(fields)}>Host Game</Button>
      </Content>
    </PageContainer>
  )
}

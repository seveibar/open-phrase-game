// @flow weak

import React, { useReducer } from "react"
import { styled } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import PageContainer from "../PageContainer"
import TextField from "@material-ui/core/TextField"
import Button from "../BigButton"
import * as colors from "@material-ui/core/colors"
import ErrorBox from "../ErrorBox"
import { useBackgroundColor } from "../ColorProvider"
import classnames from "classnames"

const TitleContainer = styled("div")({
  color: "#fff",
  marginTop: 64,
  margin: 32,
  paddingBottom: 32,
  position: "relative",
})
const Title = styled("div")(({ bg }) => ({
  position: "relative",
  zIndex: 1,
  fontSize: 72,
  textAlign: "center",
  padding: 16,
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
  "&.small": {
    fontSize: 48,
  },
}))
const Subtitle = styled("div")(({ bg }) => ({
  position: "relative",
  fontSize: 32,
  zIndex: 1,
  color: "#fff",
  fontFamily: "Knewave",
  textAlign: "center",
  "-webkit-text-stroke": `1px ${bg[800]}`,
  textShadow: `2px 2px 0 ${bg[800]},
     -1px -1px 0 ${bg[800]},
      1px -1px 0 ${bg[800]},
      -1px 1px 0 ${bg[800]},
       1px 1px 0 ${bg[800]}`,
  "&.small": {
    fontSize: 24,
  },
}))

const TitleBackground = styled("div")(({ small }) => ({
  position: "absolute",
  zIndex: 0,
  left: small ? -100 : 0,
  right: small ? -100 : 0,
  top: 0,
  bottom: 0,
  backgroundColor: colors.blue[500],
  animation: "jostle 1s ease-in-out 200ms infinite",
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

  const small = useMediaQuery("(max-width: 1000px)")
  const bg = useBackgroundColor()

  return (
    <PageContainer backgroundIndex={0}>
      <TitleContainer>
        <TitleBackground small={small} />
        <Title bg={bg} className={classnames({ small })}>
          wordy.games
        </Title>
        <Subtitle bg={bg} className={classnames({ small })}>
          A funny phrase game for friends and family
        </Subtitle>
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

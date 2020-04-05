// @flow weak

import React, { useReducer } from "react"
import PageContainer from "../PageContainer"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

export default ({ onClickJoin, onClickHost }) => {
  const [fields, changeField] = useReducer(
    (fields, [field, val]) => ({ ...fields, [field]: val }),
    {
      code: "",
      name: "",
    }
  )

  return (
    <PageContainer>
      <TextField
        label="Code"
        margin="normal"
        variant="outlined"
        onChange={(e) => changeField(["code", e.target.value])}
      />
      <TextField
        label="Name"
        margin="normal"
        variant="outlined"
        onChange={(e) => changeField(["name", e.target.value])}
      />
      <Button onClick={() => onClickJoin(fields)}>Join Game</Button>
      <Button onClick={() => onClickHost()}>Host Game</Button>
    </PageContainer>
  )
}

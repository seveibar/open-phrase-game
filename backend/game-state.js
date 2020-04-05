// @flow weak

const micro = require("micro")
const db = require("./db")
const getGameState = require("./get-game-state")

module.exports = async (req, res) => {
  const { room_id } = micro.json(req).catch((e) => ({}))
  if (!room_id) return micro.send(res, 400, "need room_id")
  res.send(res, 200, await getGameState(room_id))
}

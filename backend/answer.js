// @flow weak

const micro = require("micro")
const db = require("./db")
const getGameState = require("./get-game-state")

module.exports = async (req, res) => {
  const { room_id, match_id, creator_player_id, response } = micro
    .json(req)
    .catch((e) => ({}))
  if (!room_id) return micro.send(res, 400, "need room_id")
  if (!match_id) return micro.send(res, 400, "need match_id")
  if (!creator_player_id) return micro.send(res, 400, "need creator_player_id")
  if (!response) return micro.send(res, 400, "need response")

  db.prepare(
    "INSERT INTO answer (match_id, creator_player_id, response) VALUES (?,?,?)"
  ).run(match_id, creator_player_id, response)

  res.send(res, 200, await getGameState(room_id))
}

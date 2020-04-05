// @flow weak

const micro = require("micro")
const db = require("./db")
const getGameState = require("./get-game-state")

module.exports = async (req, res) => {
  const { room_id, voting_player_id, answer_id } = await micro
    .json(req)
    .catch((e) => ({}))
  if (!room_id) return micro.send(res, 400, "need room_id")
  if (!answer_id) return micro.send(res, 400, "need answer_id")
  if (!voting_player_id) return micro.send(res, 400, "need voting_player_id")

  db.prepare(
    "INSERT INTO vote (voting_player_id, answer_id) VALUES (?, ?)"
  ).run(voting_player_id, answer_id)

  micro.send(res, 200, await getGameState(room_id))
}

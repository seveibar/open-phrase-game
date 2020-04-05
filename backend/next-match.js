// @flow weak

const micro = require("micro")
const db = require("./db")
const getGameState = require("./get-game-state")

module.exports = async (req, res) => {
  const { room_id } = await micro.json(req).catch((e) => ({}))
  if (!room_id) return micro.send(res, 400, "need room_id")

  db.prepare(
    "UPDATE room SET last_start_time = ?, current_match_number = current_match_number + 1 WHERE room_id = ?"
  ).run(Date.now(), room_id)

  micro.send(res, 200, await getGameState(room_id))
}

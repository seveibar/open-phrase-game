// @flow weak

const micro = require("micro")
const db = require("./db")
const getGameState = require("./get-game-state")

module.exports = async (req, res) => {
  const { name, code } = await micro.json(req).catch((e) => ({}))
  if (!code) return micro.send(res, 400, "need code")
  if (!name) return micro.send(res, 400, "need name")

  const room = db.prepare("SELECT * FROM room WHERE code = ?").get(code)

  if (room.current_round_number !== 0)
    return micro.send(res, 400, "game already in progress")

  db.prepare("INSERT INTO player (room_id, name) VALUES (? , ?)").run(
    room.room_id,
    name
  )

  res.send(res, 200, await getGameState(room.room_id))
}

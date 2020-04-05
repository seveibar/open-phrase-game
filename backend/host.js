// @flow weak

const micro = require("micro")
const db = require("./db")
const getGameState = require("./get-game-state")
const randomstring = require("randomstring")

module.exports = async (req, res) => {
  const { name } = await micro.json(req).catch((e) => ({}))
  if (!name) return micro.send(res, 400, 'requires "name"')
  const code = randomstring
    .generate({ length: 4, charset: "alphabetical" })
    .toLowerCase()

  const { lastInsertRowid } = db
    .prepare("INSERT INTO room (code) VALUES (?)")
    .run(code)

  const room = db
    .prepare("SELECT * FROM room WHERE rowid=?")
    .get(lastInsertRowid)

  db.prepare("INSERT INTO player (room_id, name, host) VALUES (?, ?, ?)").run(
    room.room_id,
    name,
    1
  )

  micro.send(res, 200, await getGameState(room.room_id))
}

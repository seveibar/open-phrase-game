// @flow weak

const micro = require("micro")
const db = require("./db")
const getGameState = require("./get-game-state")

module.exports = async (req, res) => {
  const { room_id } = await micro.json(req).catch((e) => ({}))
  if (!room_id) return micro.send(res, 400, "need room_id")

  db.prepare(
    "UPDATE room SET last_start_time = ?, current_match_number = 0, current_round_number = current_round_number + 1 WHERE room_id = ?"
  ).run(Date.now(), room_id)

  const { lastInsertRowid: roundRowid } = db
    .prepare(
      "INSERT INTO game_round (room_id, round_number) SELECT room_id, current_round_number FROM room WHERE room_id = ?"
    )
    .run(room_id)
  const round = db
    .prepare("SELECT * FROM game_round WHERE rowid=?")
    .get(roundRowid)

  const players = db
    .prepare("SELECT * FROM player WHERE room_id= ? ORDER BY RAND()")
    .all(room_id)

  const questions = db
    .prepare("SELECT * FROM question ORDER BY RAND() LIMIT ?")
    .all(players.length)

  for (let matchNumber = 0; matchNumber < players.length; matchNumber++) {
    const question = questions[matchNumber]
    const participants = [matchNumber, (matchNumber + 1) % players.length].map(
      (pi) => players[pi].player_id
    )

    const { lastInsertRowid: matchRowid } = db
      .prepare(
        "INSERT INTO match (game_round_id, question_id, match_number) VALUES (?, ?, ?)"
      )
      .run(round.game_round_id, question.question_id, matchNumber)

    for (const participant of participants) {
      db.prepare(
        "INSERT INTO match_participant (player_id, match_id) SELECT ?, match_id FROM match WHERE match.rowid = ?"
      ).run(participant, matchRowid)
    }
  }

  res.send(res, 200, await getGameState(room_id))
}

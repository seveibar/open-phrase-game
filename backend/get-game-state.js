// @flow weak

const db = require("./db")

/*
{
  roomId,
  code,
  currentRoundNumber,
  roundTypes: ["waiting", "pairs", "pairs", "pairs", "finish"],
  players: [
    {
      id,
      name,
      score,
      host
    }
  ],
  rounds: [
    {},
    {
      roundNumber,
      matches: [
        {
          matchNumber,
          questionText,
          participants: [1,2],
          playerVotes: [3]
        }
      ]
    }
  ]
}
*/

module.exports = async (room_id) => {
  const room = db.prepare(`SELECT * FROM room WHERE room_id =?`).get(room_id)
  const players = db
    .prepare(
      `SELECT player.name, player.player_id, player.host, (
        SELECT COUNT(*) as score FROM vote
          INNER JOIN answer ON answer.answer_id = vote.answer_id
          WHERE answer.creator_player_id = player.player_id
      ) as score FROM player WHERE room_id =?`
    )
    .all(room_id)
  let rounds = db
    .prepare("SELECT * FROM game_round WHERE room_id = ?")
    .all(room_id)

  rounds.sort((a, b) => a.round_number - b.round_number)
  if (rounds.length === 0) rounds.push({ round_number: 0 })
  if (rounds[0].round_number !== 0)
    rounds = [{ round_number: 0 }].concat(rounds)

  return {
    roomId: room.room_id,
    code: room.code,
    currentRoundNumber: room.current_round_number,
    roundTypes: ["waiting", "pairs", "pairs", "pairs", "finish"],
    players,
    rounds: rounds.map((round) => {
      const matches = db
        .prepare(
          `
        SELECT * FROM match
        INNER JOIN question ON question.question_id = match.question_id
        WHERE game_round_id=?
      `
        )
        .all(round.game_round_id)

      return {
        roundId: round.game_round_id,
        roundNumber: round.round_number,
        matches: matches.map((match) => {
          const playerVotes = db
            .prepare(
              `
            SELECT answer.creator_player_id FROM vote
            INNER JOIN answer ON answer.answer_id = vote.answer_id
            WHERE match_id = ?
          `
            )
            .all(match.match_id)

          const participants = db
            .prepare("SELECT * FROM match_participant WHERE match_id = ?")
            .all(match.match_id)

          return {
            matchNumber: match.match_number,
            questionText: match.question_text,
            playerVotes: playerVotes.map((answer) => answer.creator_player_id),
            participants: participants.map((p) => p.player_id),
          }
        }),
      }
    }),
  }
}

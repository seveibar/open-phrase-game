const db = require("./db")

db.prepare(
  `
CREATE TABLE room (
  room_id INTEGER PRIMARY KEY AUTOINCREMENT,
  code text NOT NULL,
  current_round_number INTEGER NOT NULL DEFAULT 0,
  current_match_number INTEGER NOT NULL DEFAULT 0,
  last_start_time integer NOT NULL DEFAULT 0,
  UNIQUE (code)
)
`
).run()

db.prepare(
  `
CREATE TABLE game_round (
  game_round_id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id INTEGER NOT NULL,
  round_number INTEGER NOT NULL
)
`
).run()

db.prepare(
  `
CREATE TABLE match (
  match_id INTEGER PRIMARY KEY AUTOINCREMENT,
  game_round_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,
  match_number INTEGER NOT NULL
)
`
).run()

db.prepare(
  `
CREATE TABLE match_participant (
  match_participant_id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_id INTEGER NOT NULL,
  match_id INTEGER NOT NULL
)
`
).run()

db.prepare(
  `
CREATE TABLE player (
  player_id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id INTEGER NOT NULL,
  name text NOT NULL,
  host boolean NOT NULL DEFAULT FALSE,
  UNIQUE (room_id, name)
)
`
).run()

db.prepare(
  `
CREATE TABLE answer (
  answer_id INTEGER PRIMARY KEY AUTOINCREMENT,
  match_id INTEGER NOT NULL,
  creator_player_id INTEGER NOT NULL,
  response text NOT NULL
)
`
).run()

db.prepare(
  `
CREATE TABLE vote (
  vote_id INTEGER PRIMARY KEY AUTOINCREMENT,
  answer_id INTEGER NOT NULL,
  voting_player_id INTEGER NOT NULL
)
`
).run()

db.prepare(
  `
CREATE TABLE question (
  question_id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_text text NOT NULL
)
`
).run()

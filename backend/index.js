// @flow weak

const micro = require("micro")

const hostEndpoint = require("./host")
const gameStateEndpoint = require("./game-state")
const joinEndpoint = require("./join")
const nextRoundEndpoint = require("./next-round")
const nextMatchEndpoint = require("./next-match")
const answerEndpoint = require("./answer")
const voteEndpoint = require("./vote")
const restartGameEndpoint = require("./restart-game")

module.exports = async (req, res) => {
  switch (req.url.replace("/api", "")) {
    case "/gamestate":
      return gameStateEndpoint(req, res)
    case "/join":
      return joinEndpoint(req, res)
    case "/host":
      return hostEndpoint(req, res)
    case "/nextround":
      return nextRoundEndpoint(req, res)
    case "/nextmatch":
      return nextMatchEndpoint(req, res)
    case "/answer":
      return answerEndpoint(req, res)
    case "/vote":
      return voteEndpoint(req, res)
    case "/restartgame":
      return restartGameEndpoint(req, res)
    default: {
      return micro.send(res, 404)
    }
  }
}

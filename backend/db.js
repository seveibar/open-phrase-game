const db = require("better-sqlite3")("./database.db", { verbose: console.log })

module.exports = db

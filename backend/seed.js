const db = require("./db")

db.prepare(
  `INSERT INTO question (question_text) VALUES
    ('What is a good name for the tallest man in the world?'),
    ('What is a good thing to eat with a donut?'),
    ('Where do owls go for lunch?'),
    ('What do you do when you run out of toilet paper?'),
    ('Where does a bat store it''s hats?'),
    ('How does a dog say hi?'),
    ('Where do people go when they feel angry?')
  `
).run()

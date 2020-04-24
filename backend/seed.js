const db = require("./db")

const questions = `
The most useless college degree.
Why did Santa skip my house this year?
The latest runway trend that critics find controversial.
Screw space travel! When are they going to invent _______?
In the future, microscopes will be so high powered that we’ll be able to see _______.
The worst thing to do when you’re nervous before a date.
President Donald Trump’s newest bill to hit congress.
“Here’s some advice, son. When you want to impress a woman, _______.”
The sport that got rejected by the International Olympic Committee.
The worst thing to get tattooed on your face.
The one thing that Boomers and the younger generations will never see eye to eye on.
The last thing you’d want to catch your grandma doing.
Finish the saying: Sticks and stones may break my bones, but _______.
The title of the sauciest new romance novel.
An unexpected service you can order on the dark web.
What’s hidden under my mattress?
With Mickey Mouse’s upcoming retirement, get ready for Disney’s newest mascot, _______.
The worst news to have to break to your child.
The name of this summer’s hottest boyband.
Come on. We’re all thinking it. _______ is kind of sexy.
Name a movie that would be better starring Nicholas Cage.
The latest self-help book to hit the bestsellers list.
The worst comment a teacher could write on a student’s report.
A new classification for the Dewey Decimal System.
Invent a name for a new cryptocurrency.
Car won’t start? Have you tried _______?
An honest name for a new online dating site.
How did Amelia Earhart go missing?
The latest new infomercial product.
The secret ingredient in grandma’s cooking.
A terrible scent for a candle.
“Excuse me, waiter. There’s a _______ in my soup.”
The Jim Henson puppet that never saw the light of day.
The ‘90s cartoon duo that never made it to air.
Something you wouldn’t want to see on the priced-to-clear shelf.
“And the Game of the Year Award goes to _______.”
The lunchbox snack that got rejected by the FDA.
The last thing you want to hear the doctor say right before you’re put under.
Why did my Dad leave?
What “surprise” got Kinder eggs banned in the United States?
An honest slogan for a new makeup line.
The latest party drug to hit the streets.
_______? It’s more common than you think.
A smooth way to end a bad date.
The latest stock that investors predict will take off.
In high school, you had your jocks, nerds and goths, but no one ever mentions _______.
You think lifting weights is hard? Try lifting _______.
A great opener for the next time you’re at the watercooler.
The worst name for a new plumbing business.
The secret power move to win any negotiation.
“I’m afraid I’m going to have to fire you. It says here in your performance review that _______.”
Something that would make a terrible free sample.
“911. What’s your emergency?”
Sherlock Holmes’ most famous mystery: The case of _______.
The real reason aliens haven’t visited Earth.
A terrible name for an expensive bottle of wine.
A simple strategy to ensure everyone keeps their distance from you.
“On a scale of 1 to 5, with 5 being ‘excellent’ and 1 being ‘_______,’ how would you rate your experience with us today?”
Why did the Cold War really end?
The little-known secret to a successful marriage.
The worst nickname you could give to your significant other.
In 1920, we survived Spanish Influenza. With 2020 came the Coronavirus. In 2120, the world we be shaken by an outbreak of _______.
What was the final straw that made Dad turn the car around?
The latest new conspiracy theory.
The weirdest thing to deep fry.
The eleventh commandment that Moses forgot to write down.
An awful name for a theme park.
The one tip that doctors recommend when you’re having bathroom troubles.
A message you wouldn’t expect to find carved into a tree trunk.
Two things that could be combined to make a brilliant new invention.
A questionable name for a fried chicken restaurant.
In the future, instead of leaving the house with our keys, wallet and phone, we’ll leave with _______.
Why did the zoo have to shut down?
Smirnoff’s newest flavor of vodka.
Something you’d be surprised to find washed up on a beach.
The name of the next superhero movie.
The latest breakthrough in genetic enhancement means that scientists are now able to crossbreed _______ and _______.
What the Teenage Mutant Ninja Turtles are doing thirty years on.
The name of the newest Teletubby.
The weird sound your car is making.
“Come with me, and you’ll see, a world of pure _______.”
Your pro-wrestler name.
The weirdest thing the English have colonized.
The words of House Kardashian if it was a family in Game of Thrones.
Good things come in small packages, just like _______.
The latest health trend.
J.K. Rowling’s latest tweet.
_______, a feminist icon.
Today’s forecast is _______ with a chance of _______.
Hitler’s guilty pleasure.
You’ve heard of cyberpunk and steampunk, but have you heard of _______?
The spookiest decoration for Halloween.
A film in dire need of a gritty reboot.
The worst place for your phone to connect to the Bluetooth speaker.
“This delicious merlot was crafted in the vibrant region of _______.”
A new yoga pose.
Live, laugh, _______.
What Batman does behind closed doors.
The latest dance craze sweeping the nation.
The best thing you can offer to a troubled youth.
`
  .split("\n")
  .map((a) => a.trim())
  .filter(Boolean)

for (const question of questions) {
  db.prepare("INSERT INTO question (question_text) VALUES (?)").run(question)
}

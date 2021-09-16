# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "Destroying old data"
User.destroy_all
Game.destroy_all
ScoreBoard.destroy_all
Review.destroy_all


puts "Seeding Games"
Game.create(name: "Tetris", genre: "Puzzle", game_image_url: "https://e.snmc.io/lk/l/x/edfe5594ca62917955b26c1b446d9a0a/8378436")
Game.create(name: "Asteroids", genre: "Shooter", game_image_url: "https://mk0knowtechiec1j578p.kinstacdn.com/wp-content/uploads/2021/02/asteroids-game-main.jpg")
Game.create(name: "Snake", genre: "Action", game_image_url: "https://i.imgur.com/gF1vc03.png")
Game.create(name: "Pacman (Coming Soon)", genre: "Puzzle", game_image_url: "https://thelogicalindian.com/h-upload/2021/03/17/192284-thelogicalindianfb1000x600-1.jpg")

puts "Seeding Users"
User.create(name: "Zach", email: "fake@gmail.com", username: "zgoodz", profile_img: "https://previews.123rf.com/images/drizzd/drizzd1204/drizzd120400002/12973730-funny-potato-with-cartoon-face-3d-illustration.jpg", password: "1234")
User.create(name: "Nate", email: "fakeemail@gmail.com", username: "n-dawg", profile_img: "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/7/20/1437402009746/Mr-Potato-Head-009.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=f9c6a01d746dcf09e58162aeaaec129c", password: "1234")
User.create(name: "Elisa", email: "f@gmail.com", username: "e-dawg", profile_img: "https://www.publicdomainpictures.net/pictures/100000/velka/toothed-potato-face.jpg", password: "1234")
User.create(name: "Adam", email: "fake@yahoo.com", username: "LaMAO", profile_img: "https://i.redd.it/vqz55oda7v341.jpg", password: "1234")

puts "Seeding Scores"
ScoreBoard.create(game_id: 1, user_id: 1, score: 100)
ScoreBoard.create(game_id: 2, user_id: 1, score: 450)
ScoreBoard.create(game_id: 3, user_id: 1, score: 10)
ScoreBoard.create(game_id: 1, user_id: 2, score: 130)
ScoreBoard.create(game_id: 1, user_id: 2, score: 120)
ScoreBoard.create(game_id: 3, user_id: 2, score: 9)
ScoreBoard.create(game_id: 1, user_id: 3, score: 90)
ScoreBoard.create(game_id: 2, user_id: 3, score: 500)
ScoreBoard.create(game_id: 3, user_id: 3, score: 11)
ScoreBoard.create(game_id: 1, user_id: 4, score: 120)
ScoreBoard.create(game_id: 2, user_id: 4, score: 750)
ScoreBoard.create(game_id: 2, user_id: 4, score: 1000)
ScoreBoard.create(game_id: 3, user_id: 4, score: 15)

puts "Seeding Reviews"
Review.create(game_id: 1, user_id: 1, review: "I like blocks!")
Review.create(game_id: 2, user_id: 1, review: "I like ships!")
Review.create(game_id: 3, user_id: 1, review: "Snakes are scary")
Review.create(game_id: 3, user_id: 1, review: "I take that back, this snake is pretty cool.")
Review.create(game_id: 1, user_id: 2, review: "So many blocks! So little time!")
Review.create(game_id: 2, user_id: 2, review: "Ship go pew pew!")
Review.create(game_id: 3, user_id: 2, review: "I'm a ssssssssssnake.")
Review.create(game_id: 1, user_id: 3, review: "This game rocks!")
Review.create(game_id: 2, user_id: 3, review: "You sunk my battleship!")
Review.create(game_id: 3, user_id: 3, review: "Badger, badger, badger, badger, MUSHROOM, MUSHROOM")
Review.create(game_id: 1, user_id: 4, review: "0/10 no potatoes")
Review.create(game_id: 2, user_id: 4, review: "I wish I was on SpaceX right now")
Review.create(game_id: 3, user_id: 4, review: "Luke and Leia would totally whoop this snake's butt")

puts "✔ Done seeding!"

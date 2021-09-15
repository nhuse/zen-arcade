# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding..."
Game.create(name: "Tetris", genre: "Puzzle", game_image_url: "https://e.snmc.io/lk/l/x/edfe5594ca62917955b26c1b446d9a0a/8378436")
Game.create(name: "Asteroids", genre: "Shooter", game_image_url: "https://mk0knowtechiec1j578p.kinstacdn.com/wp-content/uploads/2021/02/asteroids-game-main.jpg")
Game.create(name: "Snake", genre: "Action", game_image_url: "https://i.imgur.com/gF1vc03.png")
puts "✔ Done seeding!"

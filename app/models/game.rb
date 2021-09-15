class Game < ApplicationRecord
    has_many :reviews
    has_many :users, through: :reviews
    has_many :score_boards, dependent: :destroy

end
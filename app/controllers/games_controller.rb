class GamesController < ApplicationController
    skip_before_action :authorize, only: :index
    def index
        games = Game.all
        render json: games, except: [:created_at, :updated_at], status: :ok
    end

    def show
        game = Game.find_by!(id: params[:id])
        scores = game.highscores_all_users
        render json: scores, only: [:score, :game_id, :created_at], include: [ :reviews, {user: { only: :username } } ], status: :ok
        # render json: game, include: [:reviews], status: :ok
    end
    

end
class GamesController < ApplicationController
    skip_before_action :authorize, only: :index
    def index
        games = Game.all
        render json: games, except: [:created_at, :updated_at], status: :ok
    end

    def show
        game = Game.find_by!(id: params[:id])
        render json: game, include: [:reviews], status: :ok
    end
end
class ScoreBoardsController < ApplicationController
    skip_before_action :authorize, only: :game_scores

    def user_scores
        scores = ScoreBoard.where(user_id: params[:user_id])
        render json: scores, only: [:score, :game_id, :created_at], include: { user: { only: [:username] }}, status: :ok
    end

    def game_scores
        scores = ScoreBoard.all.sort{|a, b| a.score <=> b.score}.reverse
        render json: scores, only: [:score, :game_id, :created_at], include: { user: { only: [:username, :profile_img] }}, status: :ok
    end
    def create
        score = ScoreBoard.create(score_params)
        render json: score, status: :created
    end

    private

    def score_params
        params.permit(:user_id, :game_id, :score, :score_board)
    end
end
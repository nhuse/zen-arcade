class ReviewsController < ApplicationController
    skip_before_action :authorize, only: :index
    def index
        reviews = Review.order(:id)
        render json: reviews, include: { user: { only: [:name] }}
    end

    def create
        review = Review.create!(review_params)
        render json: Review.all, include: { user: { only: [:name] }}, status: :created
    end

    def update
        review = Review.find_by(id: params[:id])
        review.update!(review: params[:review])
        render json: Review.order(:id), include: { user: { only: [:name] }}, status: :accepted
    end

    def destroy
        review = Review.find_by!(id: params[:id])
        review.destroy
        render json: Review.all, include: { user: { only: [:name] }}, status: :created
    end

    private

    def review_params
        params.permit(:id, :user_id, :game_id, :review)
    end
    
end
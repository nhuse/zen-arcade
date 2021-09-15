Rails.application.routes.draw do
  namespace :api do
    get '/me', to: 'users#show'
    post '/signup', to: 'users#create'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'

    get '/games', to: 'games#index'

    get '/scores/:game_id', to: 'score_boards#show'
    post '/scores', to: 'score_boards#create'

    resources :reviews
  end
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

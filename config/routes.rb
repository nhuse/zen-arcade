Rails.application.routes.draw do
  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  patch '/user/:id', to: 'users#update'

  get '/games', to: 'games#index'

  get '/game_scores/', to: 'score_boards#game_scores'
  get '/scores/:user_id', to: 'score_boards#user_scores'
  post '/scores', to: 'score_boards#create'

  resources :reviews
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

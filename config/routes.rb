Rails.application.routes.draw do

  root 'home#index'
  get 'dashboard/data', to: 'home#dashboard'

  resources :requests
  resources :rsvps, only: [:create]

  get 'games/current', to: 'games#current_game'
  resources :games
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  
  get '/members', to: 'members#index'
  post '/members', to: 'members#create'

  get '*path', to: 'home#index', via: :all

end

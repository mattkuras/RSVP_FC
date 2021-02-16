Rails.application.routes.draw do

  devise_for :admins
  root 'home#index'
  get 'dashboard/data', to: 'home#dashboard'


  get 'games/current', to: 'games#current_game'
  resources :games

  resources :requests, only:[:index, :create, :show, :destroy] 
  resources :rsvps, only: [:create]

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  
  resources :members, only: [:create, :index]

  get '*path', to: 'home#index', via: :all

end

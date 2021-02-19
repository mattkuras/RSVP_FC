Rails.application.routes.draw do

  get 'admins/create'
  get 'admins/update'
  # devise_for :admins
  root 'home#index'
  get 'dashboard/data', to: 'home#dashboard'


  get 'games/current', to: 'games#current_game'
  resources :games

  resources :requests, only:[:index, :create, :show] 
  delete '/requests/:id', to: 'requests#destroy'
  resources :rsvps, only: [:create]

  resource :admins, only: [:create]
  post "/login", to: "sessions#login"
  get "/auto_login", to: "sessions#auto_login"
  
  resources :members, only: [:create, :index]

  get '*path', to: 'home#index', via: :all

end

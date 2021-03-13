Rails.application.routes.draw do

  get 'admins/create'
  get 'admins/update'
  # devise_for :admins
  root 'home#index'

  get 'games/current', to: 'games#current_game'
  resources :games
  delete '/games/:id', to: 'games#destroy'

  resources :requests, only:[:index, :create, :show] 
  post '/requests/waitlist', to: 'requests#waitlist'
  delete '/requests/:id', to: 'requests#destroy'
  
  resources :rsvps, only: [:create]
  post '/cancelrsvp', to: 'rsvps#cancel'
  post '/rsvps/status', to: 'rsvps#get_rsvp_status'

  resource :admins, only: [:create]
  post "/login", to: "sessions#login"
  get "/auto_login", to: "sessions#auto_login"
  
  resources :members, only: [:create, :index, :destroy]
  post "membersdashboard/login", to: "sessions#member_login"

  get '*path', to: 'home#index', via: :all

end

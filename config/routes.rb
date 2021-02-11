Rails.application.routes.draw do
  root 'home#index'
  resources :players
  resources :games
  get '*path', to: 'home#index', via: :all

  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

  get '/members', to: 'members#index'
  post '/members', to: 'members#create'

end

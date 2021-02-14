Rails.application.routes.draw do
  # post '/requests', to: 'requests#create'
  # get 'requests/index'
  # get 'requests/destroy'
  # get 'requests/show'
  # root 'home#index'
  resources :requests
  resources :games
  post 'members/create'
  get '*path', to: 'home#index', via: :all

  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

  get '/members', to: 'members#index'
  post '/members', to: 'members#create'

end

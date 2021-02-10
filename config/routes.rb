Rails.application.routes.draw do
  root 'home#index'
  get '*path', to: 'home#index', via: :all

  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
end

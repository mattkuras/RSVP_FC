class GamesController < ApplicationController
  
  before_action :require_admin_login, except: [:index, :current_game]
  before_action :require_admin_or_member_login, only: [:index]
  def index
    games = Game.all.sort_by {|g| g.datetime}
    render json: games
  end

  def current_game
    game = Game.last
    if game
      render json: game
    else
      render json: "errrror"
    end
  end

  def create
    game = Game.new(game_params)
    if game.save
      render json: game
      # GameMailer.new_game(game).deliver_later
    else
      render json: game.errors
    end
  end

  def show
    game = Game.find_by(id: params[:id])
    render json: game
  end

  def update 
    game = Game.find_by(id: params[:id])
    game.update(game_params)
    if game.save 
      render json: {game: game, success: 'the game has been updated'}
      # GameMailer.update_game(game).deliver_later
    else 
      render json: {errors: game.errors}
    end
  end

  def destroy
    game = Game.find_by(id: params[:id])
    time = game.formatted_time
    members = game.members.pluck(:email)
    if game.destroy
      render json: {success: 'game has been deleted'}
      # GameMailer.cancel_game(time, members).deliver_later
    else
      render json: game.errors
    end
  end


  private

  def game_params
    params.require(:game).permit(
      :location,
      :capacity,
      :datetime
    )
  end
end

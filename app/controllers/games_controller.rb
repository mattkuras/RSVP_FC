class GamesController < ApplicationController
  
  before_action :require_login, except: [:index, :current_game]

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
    else
      render json: "errrrror"
    end
  end

  def show
    game = Game.find_by(id: params[:id])
    render json: game
  end

  def destroy
    game = Game.find_by(id: params[:id])
    if game.destroy
      render json: {success: 'game has been deleted'}
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

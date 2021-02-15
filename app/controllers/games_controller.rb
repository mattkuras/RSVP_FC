class GamesController < ApplicationController
  skip_before_action :verify_authenticity_token
    
    def index
        games = Game.all 
        render json: games
    end

    def current_game 
        game = Game.last 
        if game 
            render json: game
        else 
            render json: 'errrror'
        end 
    end

    def create
        game = Game.new(game_params)
        game.create_datetime(game_params[:datetime])
        if game.save 
            render json: game
        else
            render json: 'errrrror'
        end
    end

    def show

        game = Game.find_by(id: params[:id])
        render json: game
    end

    def delete
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

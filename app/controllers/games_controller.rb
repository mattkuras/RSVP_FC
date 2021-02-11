class GamesController < ApplicationController
    
    def index
        games = Game.all 
        render json: games
    end

    def create
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
            :datetime, 
            :location,
            :capacity
        )
    end

end

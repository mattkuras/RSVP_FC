class PlayersController < ApplicationController
    def index
        players = Player.all 
        render json: players
    end

    def create
    end

    def show
        player = Player.find_by(id: params[:id])
        render json: player
    end

    def delete
    end

    private 
    def game_params
        params.require(:player).permit(
            :member_id, 
            :game_id
        )
    end
end

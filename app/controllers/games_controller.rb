class GamesController < ApplicationController
  skip_before_action :verify_authenticity_token
    
    def index
        games = Game.all 
        render json: games.to_json(methods: [:formatted_time])
    end

    def current_game 
        game = Game.last 
        if game 
            render json: game.to_json(methods: [:formatted_time])
        else 
            render json: 'errrror'
        end 
    end

    def create
        game = Game.new(game_params)
        game.create_datetime(params[:datetime])
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

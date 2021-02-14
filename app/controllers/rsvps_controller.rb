class RsvpsController < ApplicationController
    def index
        rsvps = Rsvp.all 
        render json: rsvps
    end

    def create
        rsvp = Rsvp.new(rsvp_params)
        if rsvp.save
            render json: rsvp 
        else 
            render json: 'there was an errrrrror'
        else
    end

    def show
        rsvp = Rsvp.find_by(id: params[:id])
        render json: player
    end

    def delete
    end

    private 
    def rsvp_params
        params.require(:rsvp).permit(
            :member_id, 
            :game_id
        )
    end
end

class RsvpsController < ApplicationController
  before_action :require_admin_or_member_login, only: [:delete, :index]


  def index
    rsvps = Rsvp.all
    render json: rsvps
  end

  def create
    rsvp = Rsvp.new
    if m = Member.exists?(rsvp_params[:email])
        rsvp.member_id = Member.find_by(email: rsvp_params[:email]).id
        rsvp.game_id = rsvp_params[:game_id]
        if Rsvp.already_exists?(rsvp)
            render json: "#{rsvp.member.first_name} is already registered for this game"
        else
            render json: rsvp if rsvp.save
        end
    else
        render json: 'this email does not match any members'
    end
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
      :email,
      :game_id
    )
  end
end

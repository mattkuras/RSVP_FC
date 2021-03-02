class RsvpsController < ApplicationController
  before_action :require_admin_or_member_login, only: [:cancel, :create, :index]

  def index
    rsvps = Rsvp.all
    render json: rsvps
  end

  def create
    rsvp = Rsvp.new
    rsvp.member_id = params[:member_id]
    rsvp.game_id = params[:game_id]
    if rsvp.game.at_capacity?
      render json: "sorry this game is at capcity"
    else
      if rsvp.save
        render json: { success: "your spot has been reserved" }
        # RsvpMailer.rsvp_created(rsvp).deliver_later
      else
        render json: { errors: rsvp.errors }
      end
    end
  end

  def show
    rsvp = Rsvp.find_by(id: params[:id])
    render json: player
  end

  def cancel
    rsvp = Rsvp.where(member_id: rsvp_params[:member_id], game_id: rsvp_params[:game_id]).first
    member = Member.where(id: rsvp.member_id).first
    game = Game.where(id: rsvp.game_id).first
    if rsvp.destroy
      render json: { success: "your reservation has been deleted" }
      # RsvpMailer.rsvp_canceled(member, game).deliver_later
    else
      render json: { failure: "rsvp did not delete" }
    end
  end

  def get_rsvp_status
    game = Game.where(id: rsvp_params[:game_id]).first
    if member = Member.where(email: rsvp_params[:email]).first
      if game.members.any? { |m| m.email == member.email }
        render json: "#{member.first_name} is already registered for this game"
      else
        render json: "#{member.first_name} is not registered for this game"
      end
    else
      render json: "this email does not match any members"
    end
  end

  private

  def rsvp_params
    params.require(:rsvp).permit(
      :member_id,
      :game_id,
      :email
    )
  end
end

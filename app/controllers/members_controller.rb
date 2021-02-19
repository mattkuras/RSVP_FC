class MembersController < ApplicationController
# before_action :require_login

  def index
    members = Member.all
    render json: members
  end

  def show
    member = Member.find(params[:id])
    render json: member
  end

  def create
    request = Request.find_by(email: member_params[:email])
    member = request.accept 
    if member.save 
      MemberMailer.welcome_member(member)
      request.destroy 
      render json: member 
    else 
      byebug
      render json: {error: 'there was an error'}
    end 
  end

  def destroy
    member = Member.find(params[:id])
    member.destroy
    render json: "member has been deleted"
  end


  private

  def member_params
    params.require(:member).permit(
      :first_name,
      :last_name,
      :email,
      :reference
    )
  end
end

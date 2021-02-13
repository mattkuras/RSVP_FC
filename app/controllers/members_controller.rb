class MembersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    members = Member.all
    render json: members.to_json(methods: [:image_url])
  end

  def show
    member = Member.find(params[:id])
    render json: member.to_json(methods: [:image_url])
  end

  def create
    request = Request.find_by(id: params[:id])
    member = request.accept 
    if member.save 
      render json: member 
    else 
      render json: 'there was an error'
    end 
  end

  def destroy
    member = Member.find(params[:id])
    member.destroy
    render json: "member has been deleted from dashboard"
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

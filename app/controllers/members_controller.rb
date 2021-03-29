class MembersController < ApplicationController
  before_action :require_admin_login, except: [:show, :update]
  before_action :require_admin_or_member_login, only: [:index]

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
      MemberMailer.welcome_member(member).deliver_now
      request.destroy
      render json: member
    else
      render json: { error: "there was an error" }
    end
  end

  def destroy
    member = Member.find(params[:id])
    if member.destroy
      render json: { success: "member has been deleted" }
    else
      render json: { error: member.error }
    end
  end

  def update
    member = Member.find_by(email: params[:member][:email])
    if params[:member][:password] == params[:member][:confirm_password]
      member.update(password: params[:member][:password])
      if member.save 
        render json: {success: 'your password has been updated'}
      else 
        render json: {failure: 'there was an error updating your password'}
      end
    else
      render json: {failure: 'passwords dont match. please try again'}
    end
  end

  private

  def member_params
    params.require(:member).permit(
      :first_name,
      :last_name,
      :email,
      :reference,
      :password,
      :comfirm_password
    )
  end
end

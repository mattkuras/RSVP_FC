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
    member = Member.new(member_params)
    if Member.check_reference(params[:member][:reference])
      if member.save
        render json: member
      else
        render json: "there was an error creating your member"
      end
    else
        render json: 'this reference is incorrect'
    end
  end

  def destroy
    member = Member.find(params[:id])
    member.destroy
    render json: "member has been deleted from dashboard"
  end

  def update
    member = Member.find(params[:id])
    member.update(member_params)
    if member.save?
      render json: 200
    else
      render json: "there was an error saving poduct. maybe try deleting it and recreating"
    end
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

class RequestsController < ApplicationController
  before_action :require_admin_login, only: [:index, :show, :waitlist]

  def index
    requests = Request.all
    render json: requests
  end

  def show
    request = Request.find(params[:id])
    render json: request
  end

  def create
    request = Request.new(request_params)
    if Member.check_reference(request_params[:reference]) && request.original?
      if request.save
        render json: {request: request, success: 'request has been made'}
        RequestMailer.new_request(request).deliver_now
      end
    elsif request.original? == false 
      render json: "Already a member or request still pending."
    else
      render json: "this reference is incorrect"
    end
  end

  def destroy
    request = Request.find(params[:id])
    request.destroy
    render json: {message: "request has been deleted from dashboard", deleted: true}
  end

  def waitlist
    request = Request.find_by(id: request_params[:id])
    waitlisted_request = request.waitlist
    if waitlisted_request.save
      WaitlistMailer.welcome_waitlisted_member(waitlisted_request).deliver_now
      request.destroy
      render json: {success: waitlisted_request}
    else
      render json: { error: "there was an error" }
    end
  end


  private

  def request_params
    params.require(:request).permit(
      :first_name,
      :last_name,
      :email,
      :reference, 
      :password,
      :id
    )
  end
end

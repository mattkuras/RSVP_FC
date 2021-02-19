class RequestsController < ApplicationController
# before_action :require_login, only: [:destroy, :index]
  def index
    requests = Request.all
    render json: requests
  end

  def show
    request = Request.find(params[:id])
    render json: request
  end

  def create
    byebug
    request = Request.new(request_params)
    if Member.check_reference(request_params[:reference]) && request.original?
      if request.save
        render json: request
      else
        render json: "there was an error creating your request"
      end
    else
      render json: "this reference is incorrect"
    end
  end

  def destroy
    byebug
    request = Request.find_by(email: request_params[:email])
    request.destroy
    render json: "request has been deleted from dashboard"
  end


  private

  def request_params
    params.require(:request).permit(
      :first_name,
      :last_name,
      :email,
      :reference
    )
  end
end

class RequestsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    requests = Request.all
    render json: requests.to_json
  end

  def show
    request = Request.find(params[:id])
    render json: request.to_json
  end

  def create
    request = Request.new(request_params)
    if Request.check_reference(params[:request][:reference])
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
    request = Request.find(params[:id])
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
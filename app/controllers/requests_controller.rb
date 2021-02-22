class RequestsController < ApplicationController
before_action :require_login, except: [:create]
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
        render json: request
        render json: "there was an error creating your request"
      end
    elsif request.original? == false 
      render json: "you're already a member"
    else
      render json: "this reference is incorrect"
    end
  end

  def destroy
    request = Request.find(params[:id])
    request.destroy
    render json: {message: "request has been deleted from dashboard", deleted: true}
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

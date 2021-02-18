class AdminsController < ApplicationController
  def create
    admin = Admin.new(admin_params)
    if admin.save 
      payload = {admin_id: admin.id}
      token = encode_token(payload)
      render json: {admin: admin, jwt: token}
    else
      render json: {errors: admin.errors.full_messages}, status: :not_acceptable
    end
  end

  def update
  end
  
  private 
  def admin_params
    params.permit(:username, :password)
  end
end

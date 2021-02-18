class SessionsController < ApplicationController

  def login
    admin = Admin.find_by(username: params[:admin][:username])
    if admin&.valid_password?(params[:admin][:password])
      payload = { admin_id: admin.id }
      token = encode_token(payload)
      render json: { admin: admin, jwt: token, success: "hey dude" }
    else
      render json: { failure: 'there was an error logging in. check your inputs' }
    end
  end

  def auto_login
    if session_admin
      render json: session_admin
    else
      render json: { errors: "no admin logged in" }
    end
  end
end

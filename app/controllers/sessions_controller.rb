class SessionsController < ApplicationController

  def auto_login
    if user = session_admin || session_member
      render json: user

    else
      render json: { errors: "no admin logged in" }
    end
  end


  def login
      user = Admin.find_by(username: params[:user][:username]) || Member.find_by(email: params[:user][:email])
      if user&.valid_password?(params[:user][:password])
        payload = { user_id: user.id } 
        token = encode_token(payload)
        render json: { user: user, jwt: token, success: "hey dude" }
      else
        render json: { failure: "there was an error logging in. check your inputs" }
      end
    end


end

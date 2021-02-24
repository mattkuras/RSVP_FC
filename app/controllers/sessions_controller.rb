class SessionsController < ApplicationController

  def admin_login
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

  def member_login
    member = Member.find_by(email: params[:member][:email])
    if member&.valid_password?(params[:member][:password])
      payload = { member_id: member.id }
      token = encode_token(payload)
      render json: { member: member, jwt: token, success: "hey dude" }
    else
      render json: { failure: 'there was an error logging in. check your inputs', error: member.errors }
    end
  end

end

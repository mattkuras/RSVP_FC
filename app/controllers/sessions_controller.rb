class SessionsController < ApplicationController
skip_before_action :verify_authenticity_token
def login
    admin = Admin.find_by(username: params[:admin][:username])
    if admin&.valid_password?(params[:admin][:password]) 
        payload = {admin_id: admin.id}
        token = encode_token(payload)
        render json: {admin: admin, jwt: token, success:'hey dude'}
    else
        render json: {failure: "nope try again"}
    end
end

def auto_login
    if session_admin 
        render json: session_admin
    else 
        render json: {errors: 'no admin logged in'}
    end
end

    # def create
    #     @admin = Admin.find_by(username: session_params[:username])
    #     if @admin && @admin.authenticate(session_params[:password])
    #       login!
    #       render json: {
    #         logged_in: true
    #       }
    #     else
    #       render json: { 
    #         status: 401,
    #         errors: ['no such admin', 'verify credentials and try again or signup']
    #       }
    #     end
    #   end
    # def is_logged_in?
    #     if logged_in? && current_admin
    #       render json: {
    #         logged_in: true,
    #         admin: current_admin
    #       }
    #     else
    #       render json: {
    #         logged_in: false,
    #         message: 'no such admin'
    #       }
    #     end
    #   end
    # def destroy
    #     logout!
    #     render json: {
    #       status: 200,
    #       logged_out: true
    #     }
    #   end
    # private
    # def session_params
    #     params.require(:admin).permit(:username, :password)
    #   end
    # end
    # def session_params
    #     params.permit(:username, :password, :admin, :session)
    # end
end
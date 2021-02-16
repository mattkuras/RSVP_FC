class SessionsController < ApplicationController

    def create
      admin = Admin.where(username: params[:username]).first 
      if admin&.valid_password?(params[:password])
        render json: admin.as_json(only: [:username, :authentication_token], status: :created)
      else 
        head(:unauthorized)
      end
    end

    def destroy
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
end
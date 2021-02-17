class ApplicationController < ActionController::Base
    # before_action :require_login

    def logged_in?
      !!session_admin
    end

    def require_login
      render json: {message: 'please login'}, status: :unauthorized unless logged_in?
    end

    def encode_token(payload)
      JWT.encode(payload, 'mktrfc')
    end
     
    def session_admin
      decoded_hash = decoded_token
      if decoded_hash
        admin_id = decoded_hash[0]['admin_id']
        @admin = Admin.find_by(id: admin_id)
      else
        nil
      end
    end

    def auth_header 
      request.headers['Authorization']
    end

    def decoded_token
      if auth_header
        token = auth_header.split(' ')[1]
        begin 
          JWT.decode(token, 'mktrfc', true, algorithm: 'HS256')
        rescue JWT::DecodeError
          []
        end
      end
    end 

end

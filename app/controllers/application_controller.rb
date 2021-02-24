class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
    

    def admin_logged_in?
      !!session_admin
    end
    def admin_or_member_logged_in?
      !!session_member || !!session_admin
    end

    def require_admin_login
      render json: {message: 'please login'}, status: :unauthorized unless admin_logged_in?
    end
    def require_admin_or_member_login
      render json: {message: 'please login'}, status: :unauthorized unless admin_or_member_logged_in?
    end

    def encode_token(payload)
      JWT.encode(payload, 'mktrfc')
    end
     
    def session_admin
      decoded_hash = decoded_token
      if decoded_hash
        id = decoded_hash[0]['user_id']
        @admin = Admin.find_by(id: id) 
      else
        nil
      end
    end
    def session_member
      decoded_hash = decoded_token
      if decoded_hash
        id = decoded_hash[0]['user_id']
        @member = Member.find_by(id: id)
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

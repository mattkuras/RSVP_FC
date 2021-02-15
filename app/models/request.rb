class Request < ApplicationRecord 
    
    def accept
        request = {email: email, last_name: last_name, first_name: first_name, reference: reference}
        Member.new(request)
    end

    

  

end

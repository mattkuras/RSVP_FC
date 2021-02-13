class Request < ApplicationRecord
    
    def accept
       Member.new(email, first_name, last_name, reference)
    end

  

end

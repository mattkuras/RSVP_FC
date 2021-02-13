class Request < Member 
    
    def accept
       Member.new(email, first_name, last_name, reference)
    end

  

end

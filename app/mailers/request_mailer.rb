class RequestMailer < ApplicationMailer

    def new_request(request)
        @request = request
        email = request.reference
        @ref = Member.all.where(email: email).first
        mail(to: 'mattkuras@gmail.com', subject: "New Request for Rsvpfc")
    end

end

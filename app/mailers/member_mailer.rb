class MemberMailer < ApplicationMailer
    def welcome_member(member)
        
        mail(to: member.email, subject: "Welcome to the Club!")
    end

    def reset(member)
        @member = member
        mail(to: member.email, subject: "RSVP PASSWORD RESET")
    end

end

class MemberMailer < ApplicationMailer
    def welcome_member(member)
        
        mail(to: member.email, subject: "Welcome to the Club!")
    end
end

class MemberMailer < ApplicationMailer
    def welcome_member(member)
        
        mail(to: 'mattkuras@gmail.com', subject: "You got a new order!")
    end
end

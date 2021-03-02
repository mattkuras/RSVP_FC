class WaitlistMailer < ApplicationMailer
    def welcome_waitlisted_member(member)
        @member = member
        mail(to: member.email, subject: "Almost There")
    end
end

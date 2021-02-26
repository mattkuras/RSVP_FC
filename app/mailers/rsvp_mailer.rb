class RsvpMailer < ApplicationMailer
    def rsvp_created(rsvp)
        @member = Member.where(id: rsvp.member_id).first
        @game = Game.where(id: rsvp.game_id).first
        mail(to: @member.email, subject: "Rsvp complete!")
    end

    def rsvp_canceled(member, game)
        @member = member
        @game = game
        mail(to: @member.email, subject: "Rsvp canceled!")
    end
end

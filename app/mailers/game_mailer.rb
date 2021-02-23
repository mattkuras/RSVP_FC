class GameMailer < ApplicationMailer
    def new_game(game)
        @members = Member.all
        @game = game  
        mail(to: Member.pluck(:email), subject: "New Game on the Calendar!")
    end
end

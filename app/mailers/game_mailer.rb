class GameMailer < ApplicationMailer

    def new_game(game)
        @members = Member.all
        @game = game  
        mail(to: Member.pluck(:email), subject: "New Game on the Calendar!")
    end

    def update_game(game)
        @game = game
        mail(to: game.members.pluck(:email), subject: "Game for #{game.formatted_time} has been updated.")
    end

    def cancel_game(time, members)
        @time = time
        mail(to: members, subject: "Game for #{time} has been canceled.")
    end
end

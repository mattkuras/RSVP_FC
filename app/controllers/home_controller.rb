class HomeController < ApplicationController
    def index 
    end

    def dashboard
        games = Game.all
        requests = Request.all
        members = Member.all
        data = [games, requests, members]
        
    end
end 
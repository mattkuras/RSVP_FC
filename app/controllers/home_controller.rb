class HomeController < ApplicationController
    def index 
    end

    def dashboard
        requests = Request.all 
        members = Member.all 
        games = Game.all 
        
        render json: [games, requests, members]
    end
end 
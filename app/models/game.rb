class Game < ApplicationRecord
    has_many :rsvps
    has_many :members, through: :rsvps

    validates :datetime, :location, :capacity, presence: :true 


    def remaining_capacity
        capacity - members.length  
    end


    def create_datetime(dt)
        n = dt.split(' ').map{|num| num.to_i}
        self.datetime = DateTime.new(n[0], n[1], n[2], n[3], n[4], n[5]).strftime("%b %d, %Y %-l:%M%P")
    end
    def formatted_time
        self.datetime.strftime("%b %d, %Y %-l:%M%P")
    end

end

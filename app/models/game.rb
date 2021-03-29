class Game < ApplicationRecord
  has_many :rsvps
  has_many :members, through: :rsvps

  validates :datetime, :location, :capacity, presence: :true
  before_save :capitalize_location

  def capitalize_location
    array = location.split(' ')
    array.map{|e| e.capitalize!}.join(" ")
  end

  def remaining_capacity
    capacity - members.length
  end

  def at_capacity
    self.remaining_capacity < 1 ? true : false
  end

  def formatted_time
    self.datetime.strftime("%B %d, %-l:%M%P")
  end
end

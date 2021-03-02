class Game < ApplicationRecord
  has_many :rsvps
  has_many :members, through: :rsvps

  validates :datetime, :location, :capacity, presence: :true

  def remaining_capacity
    capacity - members.length
  end

  def at_capacity?
    self.remaining_capacity < 1 ? true : false
  end

  def formatted_time
    self.datetime.strftime("%b %d, %Y %-l:%M%P")
  end
end

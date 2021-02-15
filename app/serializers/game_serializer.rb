class GameSerializer < ActiveModel::Serializer
  attributes :id, :formatted_time, :location, :capacity, :at_capacity, :remaining_capacity
  has_many  :members, through: :rsvps
end

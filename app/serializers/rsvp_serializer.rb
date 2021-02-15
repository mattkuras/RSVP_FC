class RsvpSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :member 
  belongs_to :game
end

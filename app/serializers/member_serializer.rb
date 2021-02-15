class MemberSerializer < ActiveModel::Serializer
  attributes :id, :email, :full_name, :reference
  has_many :rsvps
end

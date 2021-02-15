class RequestSerializer < ActiveModel::Serializer
  attributes :id, :email, :full_name, :reference
end

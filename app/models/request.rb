class Request < ApplicationRecord
  def accept
    request = { email: email, last_name: last_name, first_name: first_name, reference: reference }
    Member.new(request)
  end

  def as_json
    super(:include => :full_name)
  end

  def full_name
    first_name + " " + last_name
  end
end

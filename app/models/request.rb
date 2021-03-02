class Request < ApplicationRecord
  def accept
    request = { email: email, password: password, last_name: last_name, first_name: first_name, reference: reference }
    Member.new(request)
  end

  def waitlist
    request = { email: email, password: password, last_name: last_name, first_name: first_name, reference: reference }
    Waitlist.new(request)
  end

  def full_name
    first_name + " " + last_name
  end

  def original?
    taken_emails = Member.all.map(&:email) + Waitlist.all.map(&:email) + Request.all.map(&:email)
    taken_emails.any? {|email| email == self.email} ? false : true 
  end

end

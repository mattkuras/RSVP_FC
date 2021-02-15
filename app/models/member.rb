class Member < ApplicationRecord


  validates :first_name, :last_name, :email, :reference, presence: true

  has_many :rsvps

  def self.check_reference(r)
    ref = Member.find_by(email: r)
    ref ? true : false 
  end

  def full_name 
    first_name + ' ' + last_name
  end

  def self.exists?(email)
    Member.find_by(email: email) != nil ? true : false 
  end
    
end 

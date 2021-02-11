class Member < ApplicationRecord


  validates :first_name, :last_name, :email, :reference, presence: true

  def self.check_reference(r)
    ref = Member.find_by(email: r)
    ref ? true : false 
  end
    
end 

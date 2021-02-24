class Member < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable


  validates :first_name, :last_name, :email, :reference, :password, presence: true

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

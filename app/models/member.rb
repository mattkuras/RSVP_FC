class Member < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable


  validates :first_name, :last_name, :email, :reference, :password, presence: true
  before_save :capitalize_names, :decapitalize_email
  has_many :rsvps

  def capitalize_names 
    first_name.capitalize! 
    last_name.capitalize!
  end

  def decapitalize_email
    email.downcase! 
  end


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

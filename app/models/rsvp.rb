class Rsvp < ApplicationRecord
  belongs_to :game
  belongs_to :member

  def self.already_exists?(rsvp)
    Rsvp.where(:member_id => rsvp.member_id, :game_id => rsvp.game_id).count> 0 ? true : false     
  end



end

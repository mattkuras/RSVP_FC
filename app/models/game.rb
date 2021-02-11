class Game < ApplicationRecord
    has_many :members, through: :players
end

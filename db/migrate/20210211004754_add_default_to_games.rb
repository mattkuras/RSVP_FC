class AddDefaultToGames < ActiveRecord::Migration[6.0]
  def change
    change_column :games, :at_capacity, :boolean, :default => false
  end
end

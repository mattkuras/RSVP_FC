class DropPlayers < ActiveRecord::Migration[6.0]
  def change
    rename_table :players, :rsvps
  end
end

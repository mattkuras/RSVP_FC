class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.integer :member_id, foreign_key: true
      t.integer :game_id, foreign_key: true
      t.timestamps
    end
  end
end

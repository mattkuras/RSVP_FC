class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.datetime :datetime 
      t.string :location
      t.boolean :at_capacity
      t.integer :capacity 
      t.timestamps
    end
  end
end

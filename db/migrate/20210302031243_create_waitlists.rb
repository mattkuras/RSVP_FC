class CreateWaitlists < ActiveRecord::Migration[6.0]
  def change
    create_table :waitlists do |t|
      t.string :email
      t.string :first_name
      t.string :last_name
      t.string :reference
      t.string :password

      t.timestamps
    end
  end
end

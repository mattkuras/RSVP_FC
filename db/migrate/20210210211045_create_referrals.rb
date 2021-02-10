class CreateReferrals < ActiveRecord::Migration[6.0]
  def change
    create_table :referrals do |t|
      t.integer :member_id
      t.integer :reference_id

      t.timestamps
    end
  end
end

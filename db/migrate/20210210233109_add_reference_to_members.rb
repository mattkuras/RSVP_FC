class AddReferenceToMembers < ActiveRecord::Migration[6.0]
  def change
    add_column :members, :reference, :string 
  end
end

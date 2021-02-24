class AddPasswordToRequests < ActiveRecord::Migration[6.0]
  def change
    add_column :requests, :password, :string
  end
end

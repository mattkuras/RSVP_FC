class RemoveTokenFromAdmin < ActiveRecord::Migration[6.0]
  def change
    remove_column :admins, :authentication_token, :string
  end
end

class AddInfoToFamilies < ActiveRecord::Migration
  def change
  	add_column :families, :info, :string
  end
end

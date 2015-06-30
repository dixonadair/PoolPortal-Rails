class AddMpgToFamilies < ActiveRecord::Migration
  def change
  	add_column :families, :mpg, :float
  end
end

class AddHsTimeToFamilies < ActiveRecord::Migration
  def change
  	add_column :families, :hs_time, :float
  end
end

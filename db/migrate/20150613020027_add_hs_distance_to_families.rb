class AddHsDistanceToFamilies < ActiveRecord::Migration
  def change
  	add_column :families, :hs_distance, :float
  end
end

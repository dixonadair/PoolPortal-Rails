class AddOptoutToFamilies < ActiveRecord::Migration
  def change
  	add_column :families, :optout, :boolean
  end
end

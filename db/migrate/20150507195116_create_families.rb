class CreateFamilies < ActiveRecord::Migration
  def change
    create_table :families do |t|
      t.string :last_name
      t.string :username
      t.string :password
      t.string :address
      t.float :lat
      t.float :lng
      t.string :phone
      t.string :email

      t.timestamps null: false
    end
  end
end

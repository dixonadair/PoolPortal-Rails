# require 'foreigner'

class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.string :first_name
      t.integer :grade
      # t.attachment :image
      t.integer :family_id
      t.foreign_key :families

      t.timestamps null: false
    end
  end
end

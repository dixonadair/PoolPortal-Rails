# require 'bcrypt'

# The below lines of code can be put above the class/model declaration. They can ensure against "id" duplication problems later on.
ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end

class Family < ActiveRecord::Base
	has_many :students
	
	# Added later
	# has_secure_password
	# Added later

	# belongs_to :school
	# validates :username, :password, :address, {:presence => true}
end

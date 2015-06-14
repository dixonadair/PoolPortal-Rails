# require 'bcrypt'

class Family < ActiveRecord::Base
	has_many :students
	
	# Added later
	# has_secure_password
	# Added later

	# belongs_to :school
	# validates :username, :password, :address, {:presence => true}
end

# require 'rake'

# namespace :test_task => :environment do
#   task :adduser do 
#   	Family.create(last_name: "Obama", username: "obamaprez", password: "password123", address: "1600 Pennsylvania Ave Washington, D.C.", lat: 33, lng: -80, phone: "404-444-5555", email: "barack@whitehouse.gov")
#   end
# end

desc 'change phone num for first family'
task test_task: :environment do 
	@test_fam = Family.find(1)
	@test_fam.phone = "111-222-9999"
	@test_fam.save
end
# require 'csv'
# require 'faker'
# require 'httparty'

# def addressToCoords(address)
# 	coords = []
# 	url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{address.gsub(/\s+/, "")}"
# 	response = HTTParty.get(url).to_json
# 	response = JSON.parse(response)
# 	coords << response["results"][0]["geometry"]["location"]["lat"] << response["results"][0]["geometry"]["location"]["lng"]
# 	return coords
# end

# file = File.join(Rails.root, 'lib', 'assets', 'test.csv')

# CSV.foreach(file, :headers => true) do |row|
#   Family.create(last_name: row[0], username: row[1], password: row[2], address: row[3], lat: addressToCoords(row[3])[0], lng: addressToCoords(row[3])[1], phone: Faker::PhoneNumber.cell_phone, email: Faker::Internet.email)
# end
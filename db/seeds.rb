require 'faker'
require 'httparty'
require 'json'
require 'csv'
require 'awesome_print'

# # ------------------ Original Hard-coded seeds --------------------

	# addresses = ["5001 POWERS FERRY RD Atlanta, GA 30327", "427 COCHRAN DR ATLANTA, GA 30327", "950 Davis Dr NW Atlanta, GA"]

	# lat_lngs = []
	# addresses.each do |address|
	# 	temp = []
	# 	url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{address.gsub(/\s+/, "")}"
	# 	response = HTTParty.get(url).to_json
	# 	response = JSON.parse(response)
	# 	temp << response["results"][0]["geometry"]["location"]["lat"] << response["results"][0]["geometry"]["location"]["lng"]
	# 	lat_lngs << temp
	# end

	# --- Potentially can expand on the below later to store hometoschool in the DB ---

	# addresses_shortened.each do |address|
	# 	hs_url = "https://maps.googleapis.com/maps/api/directions/json?origin=#{}&destination=#{}&key=AIzaSyDirDB7V1F3KwSFublV4KmZPhOGnJ71BLE"
	# 	hs_response = HTTParty.get(hs_url).to_json
	# 	hs_response = JSON.parse(hs_response)
	# end

	# --- Seeds with 10 data points ---

	# ten_surnames = %w[Anderson Chesterfield Warren Jones Johnson Carson Reed Hamilton Washington Jefferson]

	# ten_usernames = %w[anders chest123 warren345 jones123 johnson999 carson567 reed12 hamilton333 washington888 jefferson444]

	# --- Seeds with 3 data points ---

	# three_surnames = %w[Anderson Chesterfield Warren]

	# three_usernames = %w[anders chest123 warren345]

	# lats = [33.8907, 33.8865, 33.8843]
	# longs = [-84.4113, -84.4172, -84.4067]
	# [-84.4113, 33.8907], [-84.4172, 33.8865], [-84.4067, 33.8843]

	# three_phones = []
	# three_emails = []
	# 3.times do
	# 	three_phones << Faker::PhoneNumber.cell_phone
	# 	three_emails << Faker::Internet.email
	# end

	# for i in 0..2
	# 	Family.create(last_name: three_surnames[i], username: three_usernames[i], password: "12345678", lat: lat_lngs[i][0], address: addresses[i], lng: lat_lngs[i][1], phone: three_phones[i], email: three_emails[i])
	# end

# ------------------------ Google Maps Version ----------------------

	# def addressToCoordsGoogleMaps(address)
	# 	coords = []
	# 	url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{address.gsub(/\s+/, "")}"
	# 	response = HTTParty.get(url).to_json
	# 	response = JSON.parse(response)
	# 	coords << response["results"][0]["geometry"]["location"]["lat"] << response["results"][0]["geometry"]["location"]["lng"]
	# 	return coords
	# 	# return [33, -84]
	# end

	# def addressGetLngGoogleMaps(address)
	# 	url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{address.gsub(/\s+/, "")}"
	# 	response = HTTParty.get(url).to_json
	# 	response = JSON.parse(response)
	# 	lng = response["results"][0]["geometry"]["location"]["lng"]
	# 	return lng
	# end
	# def addressGetLatGoogleMaps(address)
	# 	url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{address.gsub(/\s+/, "")}"
	# 	response = HTTParty.get(url).to_json
	# 	response = JSON.parse(response)
	# 	lat = response["results"][0]["geometry"]["location"]["lat"]
	# 	p lat
	# end

# def addressToMapboxFormat(address)
# 	return address.gsub(/\s+/, "+")
# end

# def addressToCoordinates(address)
# 	response = JSON.parse(HTTParty.get("http://api.tiles.mapbox.com/v4/geocode/mapbox.places/#{address}.json?access_token=pk.eyJ1IjoiZGl4b25hZGFpciIsImEiOiJhR1dMRERVIn0.fpbNVrP6tCB3jOKzm41vlA"))
# 	if response["features"] != []
# 		return response["features"][0]["geometry"]["coordinates"]
# 	else
# 		return "error"
# 	end
# end

# file = File.join(Rails.root, 'lib', 'assets', 'AIS.csv')

# ---------- Initial seeding of DB ------------

# CSV.foreach(file, :headers => true) do |row|
#   fullAddress = row[3] + " " + row[4] + " " + row[5] + " " + row[6]
#   addressFormatted = addressToMapboxFormat(fullAddress)
#   coordinates = addressToCoordinates(addressFormatted)
#   if coordinates != "error"
#   	Family.create(last_name: row[1], username: row[1].downcase + "123", password: "password123", address: fullAddress, lat: coordinates[1], lng: coordinates[0], phone: Faker::PhoneNumber.cell_phone, email: Faker::Internet.email)
#   else
#   	p "Error with #{row[1]} family."
#   end
# end

# ------------- Add home-school time/distance to DB ---------------

# Family.each do |family|
# 	home_coords = []
# 	home_coords << family.lng << family.lat
# 	school_coords = [-84.378611, 33.833333]

# 	hs_url = "https://maps.googleapis.com/maps/api/directions/json?origin=#{home_coords[1]},#{home_coords[0]}&destination=#{school_coords[1]},#{school_coords[0]}&key=AIzaSyDirDB7V1F3KwSFublV4KmZPhOGnJ71BLE"
# 	hs_response = HTTParty.get(hs_url).to_json
# 	hs_response = JSON.parse(hs_response)

# 	# p hs_response["routes"][0]["legs"][0]["duration"]["value"]
# 	# p hs_response["routes"][0]["legs"][0]["distance"]["value"].meters_to_miles

# 	family.hs_time = hs_response["routes"][0]["legs"][0]["duration"]["value"]
# 	family.hs_distance = hs_response["routes"][0]["legs"][0]["distance"]["value"].meters_to_miles
# 	family.save

# 	p "#{family.last_name} family complete!"
# end

# ------------- Add opt-out, info, and mpg to table ---------------

# Family.all.each do |family|
# 	family.optout = false
# 	family.info = "OTHER INFO HERE (Briefly specify general carpooling/scheduling preferences you may have)"
# 	family.mpg = 25
# 	family.save
# 	p "#{family.last_name} family complete"
# end

# # "e.g. 'My son is in [GRADE X] so he has to be at school by [TIME], and we usually pick him up at [TIME]. Ideally, he'd prefer carpooling with someone around his age.')"

# --------------- Make all family usernames unique ----------------

@family = Family.all
@family = @family.sort
len = @family.length

counter = 2
for i in 1..len-1
	if @family[i].last_name == @family[i-1].last_name
		p "The #{@family[i].last_name} family name is duplicated!"
		# @family[i].username = @family[i].last_name.downcase + "#{counter}"
		# p Family.find(i+1)
		@temp = Family.find(i+1)
		@temp.username = @temp.last_name.downcase + "#{counter}"
		@temp.save
		counter += 1
	else
		@temp = Family.find(i+1)
		@temp.username = @temp.last_name.downcase
		@temp.save
		counter = 2
	end
end

# @temp = Family.find(1)
# @temp.username = "adair"
# @temp.save

# p Family.find(1)

# @family.each do |family|
# 	p family.last_name
# end

# -----------------------------------------------------------------

# ---- Hack to separate address into line_1 and line_2 ------------

	# my_file = File.join(Rails.root, 'lib', 'assets', 'AIS.csv')

	# cities = []
	# CSV.foreach(my_file, :headers => true) do |row|
	# 	cities << row[4]
	# 	cities
	# end

	# cities.uniq!
	# p cities

# -----------------------------------------------------------------

# ---------------------------- END --------------------------------




# -----------------------------------------------------------------

	# CSV.foreach(file, :headers => true) do |row|
	#   addressFormatted = addressToMapboxFormat(row[3] + " " + row[4] + " " + row[5] + " " + row[6])
	#   p addressFormatted
	# end

# -----------------------------------------------------------------

	# CSV.foreach(file) do |row|
	# 	# addressGetLat(row[3].to_s)
	# 	# p row[3].class
	# 	# ap addressToMapboxFormat(row[3])
	# 	ap JSON.parse(HTTParty.get("http://api.tiles.mapbox.com/v4/geocode/mapbox.places/#{addressToMapboxFormat(row[3])}.json?access_token=pk.eyJ1IjoiZGl4b25hZGFpciIsImEiOiJhR1dMRERVIn0.fpbNVrP6tCB3jOKzm41vlA"))["features"][0]["geometry"]["coordinates"]

	# ap "https://maps.googleapis.com/maps/api/geocode/json?address=#{row[3].gsub(/\s+/, "")}"
	# ap JSON.parse(HTTParty.get("https://maps.googleapis.com/maps/api/geocode/json?address=#{row[3].gsub(/\s+/, "")}").to_json)#["results"][0]["geometry"]["location"]["lng"]

# ----------------------- Student Seeds ---------------------------

	# grades = ["4K", "5K", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	# photos_arr = [1, 2, 3, 4]

	# num_families = Family.all.length
	# arr_fam_ids = (1..num_families).to_a

	# (num_families*3).times do
	# 	Student.create(first_name: Faker::Name.first_name, grade: grades.sample, family_id: arr_fam_ids.sample, image_filename: "head-#{photos_arr.sample}")
	# end

# -----------------------------------------------------------------
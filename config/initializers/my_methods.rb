# I created this file, it was not automatically generated.

class Integer
    def pretty_duration
        parse_string = ""
        min_or_hr = ""
        if self < 3600
        	parse_string = '%M:00'
            min_or_hr = " minutes"
        else
    		parse_string = '%H:%M:00'
    	    min_or_hr = " hours"
        end

        parsed = Time.at(self).utc.strftime(parse_string)
        result = parsed + min_or_hr
        result
    end

    def meters_to_miles
        result = (self.to_f/1600).to_f
        result
    end
end

class String
    def splitAddress
        ais_cities = ["Atlanta", "Norcross", "Decatur", "Tucker", "Marietta", "Roswell", "Alpharetta", "Smyrna", "Loganville", "Woodstock", "Morrow", "Mableton", "Lithonia", "Dunwoody", "Ellenwood", "Duluth", "Kennesaw", "East Point", "Sandy Springs", "Doraville", "Lilburn", "Douglasville", "Snellville", "Powder Springs", "Scottdale", "Clarkston", "Lawrenceville", "Stone Mountain", "Avondale Estates", "Acworth", "Cumming", "Chamblee", "Stockbridge", "College Park", "Suwanee", "Lithia Springs", "Buford", "Dacula", "Augusta", "Gainesville"]
        which_city = ""
        ais_cities.each do |city|
            if self.include? city
                which_city = city
            end
        end
        ind = self.index(which_city)
        result = []
        result << self[0..ind-2] << self[ind..-1]
        result
    end
end
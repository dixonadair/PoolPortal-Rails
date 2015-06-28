# I created this file, it was not automatically generated.

class Integer
    def pretty_duration
        negative = false
        if self < 0
            negative = true
        end
        hours = self.abs/3600
        minutes = (self.abs/60) % 60
        # seconds = self.abs % 60
        result = ""
        if hours == 0
            result = "#{minutes} mins" #{seconds} secs" 
        else
            result = "#{hours} hrs #{minutes} mins" #{seconds} secs"
        end
        if negative == true
            result = "-#{result}"
        end
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
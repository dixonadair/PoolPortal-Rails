# class Integer
#     def pretty_duration
#         parse_string = ""
#         min_or_hr = ""
#         if self < 3600
#         	parse_string = '%M:00'
#             min_or_hr = " minutes"
#         else
#     		parse_string = '%H:%M:00'
#     	    min_or_hr = " hours"
#         end

#         parsed = Time.at(self).utc.strftime(parse_string)
#         result = parsed + min_or_hr
#         result
#     end
# end

# p 234442.pretty_duration
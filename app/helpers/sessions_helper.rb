module SessionsHelper
	# Logs in the given user.
	def log_in(family)
	  session[:user_id] = family.id
	end
end
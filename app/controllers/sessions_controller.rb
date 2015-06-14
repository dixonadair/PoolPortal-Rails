class SessionsController < ApplicationController
  def new
  end

  def create
  	family = Family.find_by(username: params[:session][:username].downcase)
  	if family && family.password == params[:session][:password]#&& family.authenticate(params[:session][:password])
  	  session[:user_id] = family.id
  	  redirect_to main_index_path
  	else
  	  flash[:danger] = 'Invalid email and/or password'
  	  redirect_to login_path
  	end
  end

  def destroy
  	session.delete(:user_id)
  	redirect_to root_url
  end
end
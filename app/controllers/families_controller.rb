class FamiliesController < ApplicationController

  def show
	# @family = Family.find(params[:id])
	@family = Family.find(session[:user_id])
  end

  def show1
  	family = Family.find(session[:user_id])
  	response = { hi: render_to_string('families/_show', layout: false, locals: {family: family}) }
  	render json: response
  end

  def edit
  	@family = Family.find(session[:user_id])
  end

  def edit1
	family = Family.find(session[:user_id])
	response = { ha: render_to_string('families/edit', layout: false, locals: {family: family}) }
	render json: response  	
  end

  def update
	@family = Family.find(session[:user_id])

	# ----- OTHER -----
		# @family.password = params[:password]
		# @family.email = params[:email]
		# @family.last_name = params[:last_name]
		# @family.address = params[:address]
		# @family.phone = params[:phone]

		# @family.update(params[:family])

		# email = params[:entries][:email]
		# phone = params[:entries][:phone]
		# the_params = params[:entries]

		# response = { nothing: "", password: params[:password], email: params[:email], last_name: params[:last_name], address: params[:address], phone: params[:phone] }

	@family.update(password: params[:family][:password], email: params[:family][:email], last_name: params[:family][:last_name], address: params[:family][:address], phone: params[:family][:phone])

	the_params = params[:family]
	response = { the_params: the_params }
	render json: response

	# if @family.update(family_params)
	#   redirect_to main_index_path
	# else
	#   render 'edit'
	# end
  end

  private
    def family_params
      params.require(:family).permit(:last_name, :address, :password, :phone, :email)
    end

end
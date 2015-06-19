class FamiliesController < ApplicationController

  def show
    @family = Family.find(session[:user_id])
  end

  def edit
  	@family = Family.find(session[:user_id])
  end

  def update
	@family = Family.find(session[:user_id])
	if @family.update(family_params)
	  redirect_to family_path
	else
	  render 'edit'
	end
  end

  private
    def family_params
      params.require(:family).permit(:last_name, :address, :password, :phone, :email)
    end

end
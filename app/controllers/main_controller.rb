require 'httparty'
require 'json'
require 'gon'

require 'nokogiri'
require 'open-uri'

# -----------------------------------------

class MainController < ApplicationController
  def index
    if(session[:user_id])
      id = session[:user_id]
      current_user = Family.find(id)
    else
      flash[:danger] = 'You need to log in first!'
      redirect_to login_path
    end
    gon.school_coords = [-84.378611, 33.833333]
    gon.current_user = current_user
    gon.all_options = Family.where.not(id: session[:user_id])
    page = Nokogiri::HTML(open("http://www.atlantagasprices.com/index.aspx"))
    cur_price = page.css('.SideAvg tr:eq(2) td:eq(2)').text
    @cur_price = cur_price.to_f
  end

  def one_pool
    home_coords = []
    home_coords << Family.find(session[:user_id]).lng << Family.find(session[:user_id]).lat
    school_coords = [-84.378611, 33.833333]

    pool_family = Family.find(params[:pool_id])
    pool_coords = []
    pool_coords << pool_family.lng << pool_family.lat

    # ------------------------- Google Maps (Home-to-School) -------------------------

      # hs_url = "https://maps.googleapis.com/maps/api/directions/json?origin=#{home_coords[1]},#{home_coords[0]}&destination=#{school_coords[1]},#{school_coords[0]}&key=AIzaSyDirDB7V1F3KwSFublV4KmZPhOGnJ71BLE"
      # hs_response = HTTParty.get(hs_url).to_json
      # hs_response = JSON.parse(hs_response)

      # hs_time = hs_response["routes"][0]["legs"][0]["duration"]["value"]
      # hs_distance = hs_response["routes"][0]["legs"][0]["distance"]["value"].meters_to_miles

    family = Family.find(session[:user_id])
    hs_time = family.hs_time
    hs_distance = family.hs_distance

    # ------------------------- Google Maps (Home-to-Pool-to-School) -------------------------

      # hps_url = "https://maps.googleapis.com/maps/api/directions/json?origin=#{home_coords[1]},#{home_coords[0]}&destination=#{school_coords[1]},#{school_coords[0]}&waypoints=#{pool_coords[1]},#{pool_coords[0]}&key=AIzaSyDirDB7V1F3KwSFublV4KmZPhOGnJ71BLE"
      # hps_response = HTTParty.get(hps_url).to_json
      # hps_response = JSON.parse(hps_response)

      # hps_time = (hps_response["routes"][0]["legs"][0]["duration"]["value"] + hps_response["routes"][0]["legs"][1]["duration"]["value"])
      # hps_distance = (hps_response["routes"][0]["legs"][0]["distance"]["value"] + hps_response["routes"][0]["legs"][1]["distance"]["value"]).meters_to_miles

    hp_url = "https://maps.googleapis.com/maps/api/directions/json?origin=#{home_coords[1]},#{home_coords[0]}&destination=#{pool_coords[1]},#{pool_coords[0]}&key=AIzaSyDirDB7V1F3KwSFublV4KmZPhOGnJ71BLE"
    hp_response = HTTParty.get(hp_url).to_json
    hp_response = JSON.parse(hp_response)

    hp_time = hp_response["routes"][0]["legs"][0]["duration"]["value"]
    hp_distance = hp_response["routes"][0]["legs"][0]["distance"]["value"].meters_to_miles

    hps_time = hp_time + pool_family.hs_time
    hps_distance = hp_distance + pool_family.hs_distance

    # -------------- Get current price of gas for Atlanta area from gasbuddy --------------

    page = Nokogiri::HTML(open("http://www.atlantagasprices.com/index.aspx"))
    cur_price = page.css('.SideAvg tr:eq(2) td:eq(2)').text
    cur_price = cur_price.to_f

    # --------- Text-only version ----------

      # response = { pool_partial: render_to_string('main/_pool_option', layout: false, locals: { pool_family: pool_family, hs_time: hs_time, hs_distance: hs_distance, hps_time: hps_time, hps_distance: hps_distance }) }

    # --------- C3 Graph version ----------

      # response = { pool_partial: render_to_string('main/_pool_option_2', layout: false, locals: { pool_family: pool_family }), hs_gas: ((hs_distance*10)/25).round(2), hs_emissions: (((hs_distance*10)/25)*19.64).round(2), hs_dollars: (((hs_distance*10)/25)*2.70).round(2), hs_time: (((hs_time*10).round(2))/3600).round(2), hs_distance: (hs_distance*10).round(2), hps_gas: ((hps_distance*5)/25).round(2), hps_emissions: (((hps_distance*5)/25)*19.64).round(2), hps_dollars: (((hps_distance*5)/25)*2.70).round(2), hps_time: (((hps_time*5).round(2))/3600).round(2), hps_distance: (hps_distance*5).round(2) }

    # --------- Image + Savings version ----------

    response = { pool_partial: render_to_string('main/_pool_option_3', layout: false, locals: { pool_family: pool_family, hs_gas: ((hs_distance*10)/25).round(2), hs_emissions: (((hs_distance*10)/25)*19.64).round(2), hs_dollars: (((hs_distance*10)/25)*cur_price).round(2), hs_time: hs_time*10, hs_distance: (hs_distance*10).round(2), hps_gas: ((hps_distance*5)/25).round(2), hps_emissions: (((hps_distance*5)/25)*19.64).round(2), hps_dollars: (((hps_distance*5)/25)*cur_price).round(2), hps_time: hps_time*5, hps_distance: (hps_distance*5).round(2), cur_price: cur_price }) }

  	render json: response
  end
end


# ---------------- NOTES ------------------

  # This is how you would return multiple JSON objects:

    # def pool_options
    #   @thing_one = Family.find(1)
    #   @thing_two = Family.find(2)
    #   response = { :thing_one => @thing_one, :thing_two => @thing_two }
    #   render json: response
    # end

  # Then, in the ".js" file, you would access the returned things as
  # "response.thing_one" and "response.thing_two"

  # ---------------

  # :locals => { :pool_id => @message }

  # ---------------

  # response = { :my_pool => my_pool, :pool_partial => render_to_string('main/_pool_option', :layout => false), :pool_coords => pool_coords, :changed_dummy => changed_dummy }

  # ---------------

# -----------------------------------------



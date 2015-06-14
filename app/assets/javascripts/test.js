// This is the main js file for this app.

$(function(){

// ----------------------------------------------------------------------

	// Declare mapbox access token and set up map
	L.mapbox.accessToken = 'pk.eyJ1IjoiZGl4b25hZGFpciIsImEiOiJhR1dMRERVIn0.fpbNVrP6tCB3jOKzm41vlA';

	var current_location_map = L.mapbox.map('current_location_map', 'dixonadair.lkbob6kb');
	var myLayer = L.mapbox.featureLayer().addTo(current_location_map);

	// Center map at school location
	current_location_map.setView([gon.school_coords[1], gon.school_coords[0]], 12);

// ----------------------------------------------------------------------

// -- 1 --

// ----------------------------------------------------------------------

	// Make home and school markers and add to map
	var school_marker = L.mapbox.featureLayer({
	    type: 'Feature',
	    geometry: {
	        type: 'Point',
	        coordinates: gon.school_coords
	    },
	    properties: {
	        title: 'School',
	        'marker-size': 'large',
	        'marker-color': '#ff0000',
	        'marker-symbol': 'school'
	    }
	});
	school_marker.addTo(current_location_map);

	// ---------- Keep school marker z-index at 1000 ----------

	// if ($($('.leaflet-marker-pane img')[0]).css('z-index') !== 1000) {
	// 	$($('.leaflet-marker-pane img')[0]).css('z-index', 1000);
	// };

	if (1 === 1) {
		$($('.leaflet-marker-pane img')[0]).css('z-index', 1000);
		// $($('.leaflet-marker-pane img')[0]).zIndexOffset(1000);
	}

	$('.leaflet-control-zoom-out').on('click', function(e) {
		e.preventDefault();
		console.log("hi");
		$($('.leaflet-marker-pane img')[0]).css('z-index', 1000);
	});

	$('.leaflet-control-zoom-in').on('click', function(e) {
		e.preventDefault();
		console.log("bye");
		$($('.leaflet-marker-pane img')[0]).css('z-index', 1000);
	});

	// -------------------------------------------

	var home_marker = L.mapbox.featureLayer({
	    type: 'Feature',
	    geometry: {
	        type: 'Point',
	        coordinates: [gon.current_user.lng, gon.current_user.lat]// home_coords
	    },
	    properties: {
	        title: 'Home',
	        'marker-size': 'large',
	        'marker-color': '#339900',
	        'marker-symbol': 'building'
	    }
	});
	home_marker.addTo(current_location_map);

// ----------------------------------------------------------------------

	// var chart = c3.generate({
	//     bindto: '#chart',
	//     data: {
	//       columns: [
	//         ['data1', 30, 200, 100, 400, 150, 250],
	//         ['data2', 50, 20, 10, 40, 15, 25]
	//       ]
	//     }
	// });

	// var chart = c3.generate({
	// 	bindto: '.chart',
	//     data: {
	//         // iris data from R
	//         columns: [
	//             ['data1', 30],
	//             ['data2', 120],
	//         ],
	//         type : 'pie',
	//         onclick: function (d, i) { console.log("onclick", d, i); },
	//         onmouseover: function (d, i) { console.log("onmouseover", d, i); },
	//         onmouseout: function (d, i) { console.log("onmouseout", d, i); }
	//     }
	// });

	// setTimeout(function () {
	//     chart.load({
	//         columns: [
	//             ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
	//             ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
	//             ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
	//         ]
	//     });
	// }, 1500);

	// setTimeout(function () {
	//     chart.unload({
	//         ids: 'data1'
	//     });
	//     chart.unload({
	//         ids: 'data2'
	//     });
	// }, 2500);

// ----------------------------------------------------------------------

	var popupDescription = "";
	
	// marker generating function
	var markerGenerator = function(lat, lng, family_id) {
		var marker;
		popupDescription = "<div class='pool_option'><a href='http://localhost:9393/main/"+ family_id +"'>Carpool Information</a></div>"

		marker = L.mapbox.featureLayer({
		    type: 'Feature',
		    geometry: {
		        type: 'Point',
		        coordinates: [parseFloat(lng), parseFloat(lat)]
		    },
		    properties: {
		        title: popupDescription,
		        'marker-size': 'small',
		        'marker-color': '#ff8888'
		    }
		});
		marker.addTo(current_location_map);
	};

	// family iterating function
	var iterateFamilies = function(family_list) {
		for (var i = 0; i < family_list.length; i++) {
			markerGenerator(family_list[i].lat, family_list[i].lng, family_list[i].id);
			// console.log(family_list[i].id);
	    }
	};

	iterateFamilies(gon.all_options);

// ----------------------------------------------------------------------

	// $('.leaflet-marker-pane img').on('click', function(e) {
	// 	e.preventDefault();
	// 	// var fam_id = e.
	// 	var some = e.currentTarget.jQuery111203468153793364763; //.attr('src');
	// 	console.log(some);
	// 	console.log(e);
	// });

// ----------------------------------------------------------------------

	// ----- Render partial on right-hand side upon click "more info" -----

	$('.leaflet-popup-pane').on('click', '.pool_option a', function(e){
		e.preventDefault();

		var my_url = $(e.target).attr('href');
		var pool_id = my_url.split('main/')[1]
		console.log(pool_id);

		var ajaxRequest = $.ajax({
			url: '/main/one_pool',
			type: 'GET',
			dataType: 'JSON',
			data: {pool_id: pool_id}
		});
		ajaxRequest.done(function(response) {
			console.log("success");
			// console.log(response);
			$('.right-side-div').html(response.pool_partial);
			var chart_time = c3.generate({
				bindto: '.chart_time',
				axis: {
				  y: {
				    label: 'Hours'
				  }
				},
			    data: {
			        // iris data from R
			        columns: [
			            ['Alone', response.hs_time],
			            ['Carpool', response.hps_time],
			        ],
			        type : 'bar',
			        onclick: function (d, i) { console.log("onclick", d, i); },
			        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
			        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
			    }
			});
			var chart_miles = c3.generate({
				bindto: '.chart_miles',
				axis: {
				  y: {
				    label: 'Miles'
				  }
				},
			    data: {
			        // iris data from R
			        columns: [
			            ['Alone', response.hs_distance],
			            ['Carpool', response.hps_distance],
			        ],
			        type : 'bar',
			        onclick: function (d, i) { console.log("onclick", d, i); },
			        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
			        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
			    }
			});
			var chart_emissions = c3.generate({
				bindto: '.chart_emissions',
				axis: {
				  y: {
				    label: 'CO2 pounds'
				  }
				},
			    data: {
			        // iris data from R
			        columns: [
			            ['Alone', response.hs_emissions],
			            ['Carpool', response.hps_emissions],
			        ],
			        type : 'bar',
			        onclick: function (d, i) { console.log("onclick", d, i); },
			        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
			        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
			    }
			});
			var chart_gas = c3.generate({
				bindto: '.chart_gas',
				axis: {
				  y: {
				    label: 'Gallons of gas'
				  }
				},
			    data: {
			        // iris data from R
			        columns: [
			            ['Alone', response.hs_gas],
			            ['Carpool', response.hps_gas],
			        ],
			        type : 'bar',
			        onclick: function (d, i) { console.log("onclick", d, i); },
			        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
			        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
			    }
			});
		});
		ajaxRequest.fail(function() {
			console.log("error");
		});
		
	});


	// ------------------------------ END -------------------------------

});

// --------------------------- DELETED STUFF ----------------------------

// ------------------------------- 1 ------------------------------------

	// This is stuff that would go here, but since I'm not using it now and don't want it taking up space, I've put it here

	// // move the attribution control out of the way
	// current_location_map.attributionControl.setPosition('bottomleft');

	// // create the initial directions object, from which the layer and inputs will pull data.
	// var directions = L.mapbox.directions();

	// var directionsLayer = L.mapbox.directions.layer(directions)
	//     .addTo(current_location_map);

	// var directionsInputControl = L.mapbox.directions.inputControl('inputs', directions)
	//     .addTo(current_location_map);

	// var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions)
	//     .addTo(current_location_map);

	// var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
	//     .addTo(current_location_map);

	// var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions)
	//     .addTo(current_location_map);

// ----------------------------------------------------------------------

	// Mapbox Directions Request format: 'http://api.tiles.mapbox.com/v4/directions/mapbox.driving/[lng1, lat1];[lng2, lat2].json?access_token=pk.eyJ1IjoiZGl4b25hZGFpciIsImEiOiJhR1dMRERVIn0.fpbNVrP6tCB3jOKzm41vlA'

	// ----------------------------------------------------------------------
	// ----------------------------------------------------------------------
	// ----------------------------------------------------------------------
	// ----------------------------------------------------------------------
	// ----------------------------------------------------------------------

	// $('.pop_up_report_name a').on('click', function(event) {
	// 	event.preventDefault();

	// 	$.ajax({
	// 		url: event.target,
	// 		type: 'GET'
	// 		// dataType: '',
	// 		// data: {param1: 'value1'}
	// 	})
	// 	.done(function() {
	// 		// $('.right-side-div').delete // basically, clear whatever is there first
	// 		$('.right-side-div').html("<%= j render(:partial => 'pool_option') %>");
	// 		console.log("success");
	// 	})
	// 	.fail(function() {
	// 		console.log("error");
	// 	})
	// });

	// --------------------------------------------



	// if (!navigator.geolocation) {
	//     geolocate.html('Geolocation is not available');
	// } else {
	// 	geolocate.on('click',function(e) {
	// 		e.preventDefault();
	// 		e.stopPropagation();
	// 		current_location_map.locate();
	// 	});
	// }

	// current_location_map.on('locationfound', function(e) {
	//     current_location_map.fitBounds(e.bounds);

	//     var user_geo_data = myLayer.setGeoJSON({
	//         type: 'Feature',
	//         geometry: {
	//             type: 'Point',
	//             coordinates: [e.latlng.lng, e.latlng.lat]
	//         },
	//         properties: {
	//             'title': 'Here I am!',
	//             'marker-color': '#0099FF',
	//             'marker-symbol': 'star'
	//         }
	//     });

	//     $('#user_current_lat').val(user_geo_data._geojson.geometry.coordinates[0]);
	//     $('#user_current_lng').val(user_geo_data._geojson.geometry.coordinates[1]);

	//     geolocate.remove();
	// });

	// current_location_map.on('locationerror', function() {
	//     geolocate.html('Position could not be found');
	// });

// ----------------------------- Url Makers -----------------------------

  	// var makeHomeSchoolUrl = function(home_coords, school_coords) {
  	// 	var my_url = "http://api.tiles.mapbox.com/v4/directions/mapbox.driving/"+ home_coords[0] +","+ home_coords[1] +";"+ school_coords[0] +","+ school_coords[1] +".json?access_token=pk.eyJ1IjoiZGl4b25hZGFpciIsImEiOiJhR1dMRERVIn0.fpbNVrP6tCB3jOKzm41vlA"
  	// 	return my_url;
  	// };

  	// var makeHomePoolSchoolUrl = function(home_coords, pool_lng, pool_lat, school_coords) {
  	// 	var my_url = "http://api.tiles.mapbox.com/v4/directions/mapbox.driving/"+ home_coords[0] +","+ home_coords[1] +";"+ pool_lng +","+ pool_lat +";"+ school_coords[0] +","+ school_coords[1] +".json?access_token=pk.eyJ1IjoiZGl4b25hZGFpciIsImEiOiJhR1dMRERVIn0.fpbNVrP6tCB3jOKzm41vlA"
  	// 	return my_url;
  	// };

  	// // NOTE: Using "async: false" ajax way will soon be deprecated!
  	// function getJson(url) {
  	//  	return JSON.parse($.ajax({
	  // 	    type: 'GET',
	  // 	    url: url,
	  // 	    dataType: 'json',
	  // 	    global: false,
	  // 	    async: false,
	  // 	    success: function(data) {
	  // 	        return data;
  	//     	}
  	//  	}).responseText);
  	// };

// ---------------------------- getJSON ---------------------------------

  	// var test_url = "http://api.tiles.mapbox.com/v4/directions/mapbox.driving/-84.4086,33.8815;-84.3784,33.8332.json?access_token=pk.eyJ1IjoiZGl4b25hZGFpciIsImEiOiJhR1dMRERVIn0.fpbNVrP6tCB3jOKzm41vlA"

  	// function getJsonResponse(url) {
  	// 	$.getJSON(url, function(json) {
  	// 		return json;
  	// 	});
  	// };

  	// var some = getJsonResponse(test_url);

  	// console.log(some);

  	// var some = getJsonResponse(test_url);
  	// console.log(some);

  	// $.getJSON(test_url, callbackFuncWithData);

  	// var some;
  	// function callbackFuncWithData(data) {
  	// 	console.log(data);
  	// 	some = data;
  	// };
  	// console.log(some);

// ----------------------------------------------------------------------

  	// Ajax call to get directions info from Mapbox

  	// var hs_distance;
  	// var hs_duration;
  	// var hs_response;

  	// var getDirectionsHomeSchool = function(home_coords, school_coords) {

  	// 	var my_url = makeHomeSchoolUrl(home_coords, school_coords);

	  // 	var directionsAjax = $.ajax({
	  // 		url: my_url,
	  // 		type: 'GET'
	  // 	});
	  // 	directionsAjax.done(function(response) {
			// // $('.right-side-div').html(response.routes[0].distance);
	  // 		// return response;

	  // 		hs_response = response;
	  // 		hs_duration = response.routes[0].duration;

	  // 		// hs_distance = response.routes[0].distance;
	  // 		// console.log(hs_distance);
	  // 		// console.log(hs_duration);

	  // 		// console.log(response);
	  // 		console.log("success with directions ajax #1");
	  // 	});
	  // 	directionsAjax.fail(function() {
	  // 		console.log("error with directions ajax #1");
	  // 	});
  	// };

  	// var getDirectionsHomePoolSchool = function(home_coords, pool_lng, pool_lat, school_coords) {

  	// 	var my_url = makeHomePoolSchoolUrl(home_coords, pool_lng, pool_lat, school_coords)

  	// 	var directionsAjax = $.ajax({
  	// 		url: my_url,
  	// 		type: 'GET'
  	// 	});
  	// 	directionsAjax.done(function(response) {
  	// 		console.log(response);
  	// 		console.log("success with directions ajax #2");
  	// 	});
  	// 	directionsAjax.fail(function() {
  	// 		console.log("error with directions ajax #2");
  	// 	});
  	// };

// ----------------------------------------------------------------------
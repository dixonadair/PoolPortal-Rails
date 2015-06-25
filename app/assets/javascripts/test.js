// This is the main js file for this app.

$(function(){

// ----------------------------------------------------------------------

	console.log("this is a test");
	
	// Declare mapbox access token and set up map
	L.mapbox.accessToken = 'pk.eyJ1IjoiZGl4b25hZGFpciIsImEiOiJhR1dMRERVIn0.fpbNVrP6tCB3jOKzm41vlA';

	var current_location_map = L.mapbox.map('current_location_map', 'dixonadair.lkbob6kb');
	var myLayer = L.mapbox.featureLayer().addTo(current_location_map); //may be unnecessary since we are already adding the markers and layer all at once later on

	// Calculate distance from coord1 to coord2 in miles
	var firstCoords;
	var secondCoords;
	var distCalc = function(foreignLat, foreignLng) {
		firstCoords = new google.maps.LatLng(gon.current_user.lat, gon.current_user.lng);
		secondCoords = new google.maps.LatLng(foreignLat, foreignLng);
		var dist = google.maps.geometry.spherical.computeDistanceBetween(firstCoords, secondCoords);
		return (dist*0.000621371); // meters to miles
	};

	// Set appropriate zoom level for map
	var zoomLevel;
	if ( distCalc(gon.school_coords[1], gon.school_coords[0]) < 5 ) {
		zoomLevel = 11;
	} else if ( distCalc(gon.school_coords[1], gon.school_coords[0]) < 10 ) {
		zoomLevel = 10;
	} else if ( distCalc(gon.school_coords[1], gon.school_coords[0]) < 20 ) {
		zoomLevel = 9;
	} else {
		zoomLevel = 8;
	};
	// console.log(zoomLevel);

	// Center map at school location with appropriate zoom level
	current_location_map.setView([gon.school_coords[1], gon.school_coords[0]], zoomLevel);

// ----------------------------------------------------------------------

	// -- 1 --

// ----------------------------------------------------------------------

	var school_marker = L.mapbox.featureLayer({
	    type: 'Feature',
	    geometry: {
	        type: 'Point',
	        coordinates: [
	        parseFloat(gon.school_coords[0]),
	        parseFloat(gon.school_coords[1])]
		},
	    properties: {
	        title: 'School',
	        'always-show': true,
	        'marker-size': 'large',
	        'marker-color': '#ff0000',
	        'marker-symbol': 'school'
	    }
	});
	school_marker.addTo(current_location_map);

	var home_marker = L.mapbox.featureLayer({
	    type: 'Feature',
	    geometry: {
	        type: 'Point',
	        coordinates: [
	        parseFloat(gon.current_user.lng),
	        parseFloat(gon.current_user.lat)]
		},
	    properties: {
	        title: 'Home',
	        'always-show': true,
	        'marker-size': 'large',
	        'marker-color': '#339900',
	        'marker-symbol': 'building'
	    }
	});
	home_marker.addTo(current_location_map);

	// Set school and home markers' z-index at 1000
	$($('.leaflet-marker-pane img')[0]).css('z-index', 1000);
	$($('.leaflet-marker-pane img')[1]).css('z-index', 1000);

// ----------------------------------------------------------------------

	// This variable will hold all geoJSON markers
	var geojson = [];

	var radiusChecker = function(miles, foreignLat, foreignLng) {
		if ( distCalc(foreignLat, foreignLng) > miles ) {
			return false;
		} else {
			return true;
		}
	};
	
	// marker generating function
	var popupDescription = "";
	var geoJSONMarkerGenerator = function(lat, lng, family_id, family_last_name) {
		var marker;
		popupDescription = "<p>"+ family_last_name +" Family<p><div class='pool_option'><a href='http://localhost:3000/main/"+ family_id +"'>Get Carpool Information</a></div>"

		marker = {
		  "type": "Feature",
		  "geometry": {
		    "coordinates": [
		      parseFloat(lng),
		      parseFloat(lat)
		    ],
		    "type": "Point"
		  },
		  "properties": {
		    "title": popupDescription,
		    "0.5-mile": radiusChecker(0.5, parseFloat(lat), parseFloat(lng)),
		    "1-mile": radiusChecker(1, parseFloat(lat), parseFloat(lng)),
		    "2-mile": radiusChecker(2, parseFloat(lat), parseFloat(lng)),
		    "5-mile": radiusChecker(5, parseFloat(lat), parseFloat(lng)),
		    "10-mile": radiusChecker(10, parseFloat(lat), parseFloat(lng)),
		    "last_name": family_last_name,
		    "marker-color": "#ff8888",
		    "marker-size": "small"
		  }
		};
		geojson.push(marker);
	};

	// family iterating function
	var iterateFamilies = function(family_list) {
		for (var i = 0; i < family_list.length; i++) {
			geoJSONMarkerGenerator(family_list[i].lat, family_list[i].lng, family_list[i].id, family_list[i].last_name);
	    }
	};

	iterateFamilies(gon.all_options);

// ----------------------------------------------------------------------
	
	// Add markers to map
	var markers = L.mapbox.featureLayer()
	    .setGeoJSON(geojson)
	    .addTo(current_location_map);

	// Initially (default view) only show families within 2-mile radius of home
	markers.setFilter(function(f) {
	    return (f.properties["2-mile"] === true || f.properties["always-show"] === true);
	});

	// Filter markers based on radius from home
	$('.menu-ui a').on('click', function(e) {
		e.preventDefault();
	    // For each filter link, get the 'data-filter' attribute value.
	    var filter = $(this).data('filter');
	    $(this).addClass('active').siblings().removeClass('active');
	    markers.setFilter(function(f) {
	        // If the data-filter attribute is set to "all", return
	        // all (true). Otherwise, filter on markers that have
	        // a value set to true based on the filter name.
	        return (filter === 'all') ? true : (f.properties[filter] === true || f.properties["always-show"] === true);
	    });
	    return false;
	});

// ----------------------------------------------------------------------

	// Once "enter" key is pressed inside search family bar, do the following
	$('#search').keypress(function(e) {
	    if(e.which == 13) {
	        searchFunc();
	    }
	});

	// Search markers by family
	function searchFunc() {
	    // get the value of the search input field
	    var searchString = $('#search').val(); //.toLowerCase();
	    markers.setFilter(showFamily);

	    // here we're simply comparing the 'state' property of each marker
	    // to the search string, seeing whether the former contains the latter.
	    function showFamily(feature) {
	        return (feature.properties.last_name === searchString || feature.properties["always-show"] === true);
	    }
	};

// ----------------------------------------------------------------------

	// $('.leaflet-marker-pane img').on('click', function(e) {
	// 	e.preventDefault();
	// 	// var fam_id = e.
	// 	var some = e.currentTarget.jQuery111203468153793364763; //.attr('src');
	// 	console.log(some);
	// 	console.log(e);
	// });

// ----------------------------------------------------------------------

	// View, edit, and update "my profile" all with ajax
	$('.my-profile').on('click', 'a', function(e) {
		e.preventDefault();
		var ajaxRequest = $.ajax({
			url: '/families/show1',
			type: 'GET'
		});
		ajaxRequest.done(function(response) {
			$('.right-side-div').html(response.hi);
			console.log("success");
		});
		ajaxRequest.fail(function() {
			console.log("error");
		});
	});

	$('.right-side-div').on('click', '.ajax-edit', function(e) {
		e.preventDefault();
		console.log(e);
		var ajaxRequest = $.ajax({
			url: '/families/edit1',
			type: 'GET'
		});
		ajaxRequest.done(function(response) {
			console.log(response);
			$('.right-side-div').html(response.ha);
			console.log("success");
		});
		ajaxRequest.fail(function() {
			console.log("error");
		});
	});

	$('.right-side-div').on('click', '.submit-update', function(e) {
		e.preventDefault();
		var form_entries = $('form').serialize();
		// console.log(form_entries);

		// -------------------------------------------------------------------
			// var password = $($('form .password-field input')[0]).attr('value');
			// var email = $($('form .email-field input')[0]).attr('value');
			// var last_name = $($('form .last_name-field input')[0]).attr('value');
			// var address = $($('form .address-field input')[0]).attr('value');
			// var phone = $($('form .phone-field input')[0]).attr('value');

			// console.log(password);
			// console.log(email);
			// console.log(last_name);
			// console.log(address);
			// console.log(phone);

		var ajaxRequest = $.ajax({
			url: '/families/update',
			type: 'PATCH',
			dataType: 'JSON',
			data: form_entries
		});
		ajaxRequest.done(function(response) {
			console.log("success");
			console.log(response.the_params);
			$('.right-side-div').html("");
		});
		ajaxRequest.fail(function() {
			console.log("error");
		});
	});

// ----------------------------------------------------------------------

	// ----- Render partial on right-hand side upon click "more info" -----

	$('.leaflet-popup-pane').on('click', '.pool_option a', function(e){
		e.preventDefault();
	});
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
			// Uncomment and unindent the below when using pool_option_2.html.erb
				// var chart_time = c3.generate({
				// 	bindto: '.chart_time',
				// 	axis: {
				// 	  y: {
				// 	    label: 'Hours'
				// 	  }
				// 	},
				//     data: {
				//         // iris data from R
				//         columns: [
				//             ['Alone', response.hs_time],
				//             ['Carpool', response.hps_time],
				//         ],
				//         type : 'bar',
				//         onclick: function (d, i) { console.log("onclick", d, i); },
				//         onmouseover: function (d, i) { console.log("onmouseover", d, i); },
				//         onmouseout: function (d, i) { console.log("onmouseout", d, i); }
				//     }
				// });
				// var chart_miles = c3.generate({
				// 	bindto: '.chart_miles',
				// 	axis: {
				// 	  y: {
				// 	    label: 'Miles'
				// 	  }
				// 	},
				//     data: {
				//         // iris data from R
				//         columns: [
				//             ['Alone', response.hs_distance],
				//             ['Carpool', response.hps_distance],
				//         ],
				//         type : 'bar',
				//         onclick: function (d, i) { console.log("onclick", d, i); },
				//         onmouseover: function (d, i) { console.log("onmouseover", d, i); },
				//         onmouseout: function (d, i) { console.log("onmouseout", d, i); }
				//     }
				// });
				// var chart_emissions = c3.generate({
				// 	bindto: '.chart_emissions',
				// 	axis: {
				// 	  y: {
				// 	    label: 'CO2 pounds'
				// 	  }
				// 	},
				//     data: {
				//         // iris data from R
				//         columns: [
				//             ['Alone', response.hs_emissions],
				//             ['Carpool', response.hps_emissions],
				//         ],
				//         type : 'bar',
				//         onclick: function (d, i) { console.log("onclick", d, i); },
				//         onmouseover: function (d, i) { console.log("onmouseover", d, i); },
				//         onmouseout: function (d, i) { console.log("onmouseout", d, i); }
				//     }
				// });
				// var chart_gas = c3.generate({
				// 	bindto: '.chart_gas',
				// 	axis: {
				// 	  y: {
				// 	    label: 'Gallons of gas'
				// 	  }
				// 	},
				//     data: {
				//         // iris data from R
				//         columns: [
				//             ['Alone', response.hs_gas],
				//             ['Carpool', response.hps_gas],
				//         ],
				//         type : 'bar',
				//         onclick: function (d, i) { console.log("onclick", d, i); },
				//         onmouseover: function (d, i) { console.log("onmouseover", d, i); },
				//         onmouseout: function (d, i) { console.log("onmouseout", d, i); }
				//     }
				// });
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

// ----------------------------------------------------------------------
	
	// --- non-geoJSON way of putting markers on map ---

	// var popupDescription = "";
	
	// // marker generating function
	// var markerGenerator = function(lat, lng, family_id) {
	// 	var marker;
	// 	popupDescription = "<div class='pool_option'><a href='http://localhost:9393/main/"+ family_id +"'>Carpool Information</a></div>"

	// 	marker = L.mapbox.featureLayer({
	// 	    type: 'Feature',
	// 	    geometry: {
	// 	        type: 'Point',
	// 	        coordinates: [parseFloat(lng), parseFloat(lat)]
	// 	    },
	// 	    properties: {
	// 	        title: popupDescription,
	// 	        'marker-size': 'small',
	// 	        'marker-color': '#ff8888',
	// 	        "5-mile": false,
	// 	        "10-mile": true
	// 	    }
	// 	});
	// 	marker.addTo(current_location_map);
	// };

	// // family iterating function
	// var iterateFamilies = function(family_list) {
	// 	for (var i = 0; i < family_list.length; i++) {
	// 		markerGenerator(family_list[i].lat, family_list[i].lng, family_list[i].id);
	// 		// console.log(family_list[i].id);
	//     }
	// };

	// iterateFamilies(gon.all_options);

// ----------- Keep school marker z-index at 1000 (attempts) ------------

	// if ($($('.leaflet-marker-pane img')[0]).css('z-index') !== 1000) {
	// 	$($('.leaflet-marker-pane img')[0]).css('z-index', 1000);
	// };

	// if (1 === 1) {
	// 	$($('.leaflet-marker-pane img')[0]).css('z-index', 1000);
	// 	// $($('.leaflet-marker-pane img')[0]).zIndexOffset(1000);
	// }

	// $('.leaflet-control-zoom-out').on('click', function(e) {
	// 	e.preventDefault();
	// 	console.log("hi");
	// 	$($('.leaflet-marker-pane img')[0]).css('z-index', 1000);
	// });

	// $('.leaflet-control-zoom-in').on('click', function(e) {
	// 	e.preventDefault();
	// 	console.log("bye");
	// 	$($('.leaflet-marker-pane img')[0]).css('z-index', 1000);
	// });

// ----------- GeoJSON home and school markers -----------

		// var geoJsonSchoolMarker = {
		//   "type": "Feature",
		//   "geometry": {
		//     "coordinates": [
		//     	parseFloat(gon.school_coords[0]),
		// 	    parseFloat(gon.school_coords[1])
		// 	],
		//     "type": "Point"
		//   },
		//   "properties": {
	 //        title: 'School',
	 //        'always-show': true,
	 //        'marker-size': 'large',
	 //        'marker-color': '#ff0000',
	 //        'marker-symbol': 'school'
		//   }
		// };
		// var geoJsonHomeMarker = {
		//   "type": "Feature",
		//   "geometry": {
		//     "coordinates": [
		//     	gon.current_user.lng,
		// 	    gon.current_user.lat
		// 	],
		//     "type": "Point"
		//   },
		//   "properties": {
	 //        title: 'Home',
	 //        'always-show': true,
	 //        'marker-size': 'large',
	 //        'marker-color': '#339900',
	 //        'marker-symbol': 'building'
		//   }
		// };
		// geojson.push(geoJsonSchoolMarker);
		// geojson.push(geoJsonHomeMarker);
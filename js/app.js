
		var icons = {
				"clear-day" 			: "B",
				"clear-night" 			: "C",
				"rain"					: "R",
				"snow"					: "G",
				"sleet"					: "X",
				"wind"					: "S",
				"fog"					: "N",
				"cloudy"				: "Y",
				"partly-cloudy-day"		: "H",
				"partly-cloudy-night"	: "I",
		};

		var cities = {
				"london" 				: { coords : { latitude : "51.50722",    	longitude:  "-0.12750" 		}},
				"edinburgh"				: { coords : { latitude : "55.9520600",  	longitude:  "-3.1964800" 	}},
				"cardiff"				: { coords : { latitude : "51.58",			longitude:  "-3.18" 		}},
				"antarctica"			: { coords : { latitude : "-79.644474",		longitude:  "12.992225"		}},
				"current location"		: ""
		};

		var days = {
				"0"		:	"Sunday",
				"1"		:	"Monday",
				"2"		:	"Tuesday",
				"3"		:	"Wednesday",
				"4"		:	"Thursday",
				"5"		:	"Friday",
				"6"		:	"Saturday"
		};

		var date	= new Date();
		var Today	= date.getDay();
		console.log("today is: " + Today);

		function loadWeather(cityCoords){

			var latlng = cityCoords.coords.latitude + "," + cityCoords.coords.longitude;
			var forecastURL = "https://api.forecast.io/forecast/0d2c400aa68ca8e6cda034a2649c9b72/" + latlng;
			$.ajax({
				url: forecastURL,
				jsonpCallback: 'jsonCallback',
				contentType: "application/json",
				dataType: 'jsonp',
				success: function(json) {
					console.log(json);
					$("#current_temp").html(Math.round(json.currently.temperature) + "&#176;F");
					$("#current_summary").html(json.currently.summary);
					$("#current_temp").attr("data-icon",icons[json.currently.icon]);
					weeklyForecast(json);
				},
				error: function(e) {
					console.log(e.message);
				}
			});
		}

		function weeklyForecast (json) {
			var tag;
			var Day = Today; //sets as tomorrow
			var outhtml;
			console.log(tag);
			for ( var i = 0; i <= 6; i++)
			{
				outhtml = "";
				Day = Day + 1
				console.log(Day);
				if ( Day === 7) {
					Day = 0;
				}
				
				outhtml = outhtml + " " + days[Day] + " ";
				outhtml = outhtml + "Max " + Math.round(json.daily.data[i].temperatureMax) + "&#176;F   ";
				outhtml = outhtml + "Min " + Math.round(json.daily.data[i].temperatureMin) + "&#176;F   ";
				//iterate through days in list
				tag = '#' + i;
				//apply forecast info to list item
				$(tag).attr("data-icon", icons[json.daily.data[i].icon]).html(outhtml);

			}
		}


		function loadDefaultCity() {
			loadCity("London");
		}

		function loadCity(city) {
			$("#location").html(city);

			if (city.toLowerCase() == "current location") {
				if ( navigator.geolocation ) {
					navigator.geolocation.getCurrentPosition(loadWeather, loadDefaultCity);
				} else {
					loadDefaultCity();
				}
			} else {
				loadWeather(cities[city.toLowerCase()]);
			}
		}

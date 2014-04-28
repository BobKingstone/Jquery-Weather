
		var date	= new Date();
		var Today	= date.getDay();


		function loadWeather(cityCoords){

			var latlng = cityCoords.coords.latitude + "," + cityCoords.coords.longitude;
			var forecastURL = "https://api.forecast.io/forecast/0d2c400aa68ca8e6cda034a2649c9b72/" + latlng;

			$.ajax({
				url: forecastURL,
				jsonpCallback: 'jsonCallback',
				contentType: "application/json",
				dataType: 'jsonp',
				success: function(json) {
					updateCurrentWeather(json);
					weeklyForecast(json);
				},
				error: function(e) {
					console.log(e.message);
				}
			});
		}

		function updateCurrentWeather (json) {
				$("#current_temp").html(Math.round(json.currently.temperature) + "&#176;F");
				$("#current_summary").html(json.currently.summary);
				$("#current_temp").attr("data-icon",icons[json.currently.icon]);
		}

		function weeklyForecast (json) {
			
			var Day = Today; 
			var outhtml;

			for ( var i = 0; i <= 6; i++)
			{
				outhtml = "";
				Day = Day + 1

				//check if day is greater than number in week
				if ( Day === 7) {
					Day = 0;
				}
				
				//format html
				outhtml = '<li><h3 class="icon" data-icon="' + icons[json.daily.data[i].icon] + ' ">' + days[Day];
				outhtml = outhtml + "Max " + Math.round(json.daily.data[i].temperatureMax) + "&#176;F   ";
				outhtml = outhtml + "Min " + Math.round(json.daily.data[i].temperatureMin) + "&#176;F   ";
				outhtml = outhtml + '</h3></li>';

				//append new html li item to list view
				$(".WeekForecast").append(outhtml);
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

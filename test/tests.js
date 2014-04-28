//used to represent celsius sign in text tests
var htmlChar;

module("weatherApp Initial Setup", {
    setup: function () {
    	$("body").append('<div id="qunit-fixture"></div>')
        $("#qunit-fixture").append('<div id="ui-content"><h1 id="current_temp" class="icon" data-icon="A">65&#176;F</h1>' +
        							'<p id="current_summary">Partly Cloudy</p>' 	+
        							'<p id="location">Current Location</p></div>' 	+
        							'<ul class="WeekForecast"></ul>' +
        							'<p id="htmlChar">&#176;F</p>');
        //default weather data for testing
        htmlChar = $("#htmlChar").html();
    },
    teardown: function() {
    	$("#qunit-fixture").remove();
    }
});

	test('user is presented with default temperature', function () {

		var expected = "65" + htmlChar;
		var temp = $("#current_temp").text();

		equal(temp,expected,"Default temperature is displayed");
	});

	test('ajax call should include coords of predefined city - london', function () {

		//mock function calls made by loadWeather
		$.ajax = function(options) {
			equal(options.url, "https://api.forecast.io/forecast/0d2c400aa68ca8e6cda034a2649c9b72/51.50722,-0.12750");
			options.success("ajax called");
		};

		updateCurrentWeather = function(json){};
		weeklyForecast = function (json){};

		//london used as is stationary data
		loadWeather(cities['london']);
	});

	test('current weather is updated by new weather data', function () {

		//actual results
		$("#current_temp").html("");

		var expected_temp 		= "10" + htmlChar;
		var expected_summary 	= "foobar summary";
		var expected_icon 		= "rain";

		//call function with test data
		updateCurrentWeather(WeatherJson);

		var actual_temp 	= $("#current_temp").text();
		var actual_summary 	= $("#current_summary").text();
		var actual_icon		= $("#current_temp").attr("data-icon");

		equal(actual_temp,expected_temp,"temperature has been updated");
	});

	test('Weekly forecast is updated', function() {
		var expected_row_count = 7;
		var actual_row_count = 0;

		weeklyForecast(WeatherJson);

		actual_row_count = $(".WeekForecast li").size();

		equal(actual_row_count,expected_row_count,"number of days added to forecast");
	});


define(["jquery", "q"], function($,q){
	return{
		getWeather: function(zipCode,dayAmount){
			var deferred = q.defer();
			//ajax call to return weather results
			$.ajax("http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+",us&appid=85e2aa2320f9430de316a4ccae178753&units=imperial")
			.done(function(weatherData) {
				weatherData = JSON.stringify(weatherData);
				weatherData = $.parseJSON(weatherData);
				console.log(weatherData);
				weatherData.dt = new Date();
				var position = weatherData.dt.toString().indexOf("2015")+4;
				console.log(position);
				weatherData.dt = weatherData.dt.toString().slice(0,position);
				console.log(weatherData.dt);
				//returns the promise
				deferred.resolve(weatherData);
			}).fail(function() {
				console.log("failed to get weather");
			});
			return deferred.promise;
		},
		getWeatherMulti: function(zipId,dayAmount){
			var deferred = q.defer();
			//ajax call to return weather results
			$.ajax("http://api.openweathermap.org/data/2.5/forecast/daily?id="+zipId+",us&appid=85e2aa2320f9430de316a4ccae178753&units=imperial&cnt="+dayAmount)
			.done(function(weatherData) {
				weatherData = JSON.stringify(weatherData);
				weatherData = $.parseJSON(weatherData);
				//returns the promise
				deferred.resolve(weatherData);
			}).fail(function() {
				console.log("failed to get weather");
			});
			return deferred.promise;
		},
		retrieveForecasts: function(uid){
			console.log("called retrieve forecasts");
			var deferred = q.defer();

			//creates snapshot of user's firebase data. 
			var myFirebaseRef = new Firebase("https://nssweatherapp.firebaseio.com/users/"+uid);
			myFirebaseRef.on("value", function(snapshot){
			var forecasts = snapshot.val();

			//creates array of objects
			var allForecasts = [];
			for(var key in forecasts){
				var forecastWithId = forecasts[key];
				forecastWithId.key = key;
				allForecasts[allForecasts.length] = forecastWithId;
			}

			//removes email from allforecasts array
			allForecasts.pop();
			deferred.resolve(allForecasts);
			});
			return deferred.promise;
		}
	};
});	
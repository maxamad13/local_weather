define(["jquery", "q"], function($,q){
	return{
		getWeather: function(zipCode,dayAmount){
			console.log("got to get weather");
			var deferred = q.defer();
			//ajax call to return weather results
			$.ajax("http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+",us&appid=85e2aa2320f9430de316a4ccae178753&units=imperial")
			.done(function(weatherData) {
				weatherData = JSON.stringify(weatherData);
				weatherData = $.parseJSON(weatherData);
				//returns the promise
				deferred.resolve(weatherData);
			}).fail(function() {
				console.log("failed to get weather");
			});
			return deferred.promise;
		}
	}
});	
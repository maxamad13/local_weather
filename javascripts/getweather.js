define(["jquery", "q"], function($,q){
	return{
		getWeather: function(zipCode,dayAmount){
			var deferred = q.defer();
			//ajax call to return weather results
			$.ajax()
			.done(function(weatherData) {
				//returns the promise
				deferred.resolve();
			}).fail(function() {
				console.log("failed to get weather");
			});
			return deferred.promise;
		}
	}
});	
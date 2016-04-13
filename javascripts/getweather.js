define(["jquery", "q"], function($,q){
	return{

		getWeather: function(zipCode,dayAmount){
			var deferred = q.defer();
			
			//ajax call to return weather results
			$.ajax("http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+",us&appid=85e2aa2320f9430de316a4ccae178753&units=imperial")
			.done(function(weatherData) {
				weatherData = JSON.stringify(weatherData);
				weatherData = $.parseJSON(weatherData);

				//change date to readable format
				weatherData.dt = new Date();
				var dayend = weatherData.dt.toString().slice(0,3);
				var dateend = weatherData.dt.toString().slice(4,10)
				var position = weatherData.dt.toString().indexOf("2016")+4;
				weatherData.dt = dayend+ ", "+dateend+", "+weatherData.dt.toString().slice(11,position);

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
				console.log(weatherData);
				//changes date to readable format
				for(var i=0; i<weatherData.list.length; i++){
					//gets data of current day
					weatherData.list[i].dt = new Date();
					//gets day of the month
					var day = weatherData.list[i].dt.getUTCDate()-1;
					//reseting day based on the iteration from the start day
					var newDay = weatherData.list[i].dt.setDate(day+i);
					//tranferring back into a new day object
					weatherData.list[i].dt = new Date(newDay);
					//finding the position of 2015 so the time can be removed from the date object
					var position = weatherData.list[i].dt.toString().indexOf("2016")+4;
					//tranforming the date object into a string, then removing the time portion and reseting the date to that
					var dayend = weatherData.list[i].dt.toString().slice(0,3);
					var dateend = weatherData.list[i].dt.toString().slice(4,10)
					var position = weatherData.list[i].dt.toString().indexOf("2016")+4;
					weatherData.list[i].dt = dayend+ ", "+dateend+", "+weatherData.list[i].dt.toString().slice(11,position);
					//weatherData.list[i].dt = weatherData.list[i].dt.toString().slice(0,position);	
				}

				//returns the promise
				deferred.resolve(weatherData);
			}).fail(function() {
				console.log("failed to get weather");
			});
			return deferred.promise;
		},

		retrieveForecasts: function(uid){
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
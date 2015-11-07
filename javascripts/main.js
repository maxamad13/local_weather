requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../lib/bower_components/q/q',
    'firebase' : '../lib/bower_components/firebase/firebase'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {exports: 'Firebase'}
  }
});

requirejs(
  ["jquery","firebase", "lodash", "hbs", "bootstrap", "q", "loginReg", "getweather", "hbs!../templates/forecasts", "hbs!../templates/multiDay"],
  function($,firebase, _, Handlebars, bootstrap, q,loginReg, getWeather, forecasts, multiDay) {

    var user;
    var pass;
    var firebaseRef = new firebase("https://nssweatherapp.firebaseio.com");

    //login an existing user
    $(document).on('click', '#login', function(){
      user = $('#username').val();
      pass = $('#password').val();
      loginReg.getLogin(user, pass);
    });

    //register a new user
    $(document).on('click', '#register', function(){
      user = $('#username').val();
      pass = $('#password').val();
      loginReg.getRegister(user, pass);
    });

    //this handles zip search button functionality for search zip code
    var zipId;
    $(document).on('click', '#zipSubmit', function(){
      var zipValue = $('#zip').val();
      console.log("test search", zipValue);
      //run search
      getWeather.getWeather(zipValue, 1)
        .then(function(weatherData){
          zipId=weatherData.id;
          $("#forecast").html(forecasts(weatherData));
        });
    })

    //this handles enter functionality for searching zip code
    $('#zip').keypress(function(e){
      if(e.which === 13){
        var zipValue = $('#zip').val();
        console.log("test search", zipValue);
        //run search
        getWeather.getWeather(zipValue, 1)
          .then(function(){
            $("#forecast").html(forecasts(weatherData));
          })
      }

    })   


    $(document).on('click', '#today, #threeDay, #sevenDay', function(){
      var forecastVal = $(this).data('days');

      switch(forecastVal){
        case 1:
          console.log("1");
          getWeather.getWeatherMulti(zipId, 1)
          .then(function(weatherData){
            $("#forecast").html(multiDay(weatherData));
          })
          break;
        case 3:
          console.log("3");
          getWeather.getWeatherMulti(zipId, 3)
          .then(function(weatherData){
            $("#forecast").html(multiDay(weatherData));
          })
          break;
        case 7:
          console.log("7");
          getWeather.getWeatherMulti(zipId, 7)
          .then(function(weatherData){
            $("#forecast").html(multiDay(weatherData));
          })
          break;
      }
    })

});














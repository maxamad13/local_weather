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
  ["jquery", "lodash", "hbs", "bootstrap", "q"],
  function($, _, Handlebars, bootstrap, q) {



     function weather(){  

      var api = "http://api.openweathermap.org/data/2.5/weather?zip=";
      var city = "37211";
      var apiCode = ",us&appid=85e2aa2320f9430de316a4ccae178753";


      var url = api + city + apiCode;
      console.log(url);
      
    }


    weather();




 
    
    });














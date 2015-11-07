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
  ["jquery","firebase", "lodash", "hbs", "bootstrap", "q", "loginReg"],
  function($,firebase, _, Handlebars, bootstrap, q,loginReg) {

 
    var user;
    var pass;
    var firebaseRef = new firebase("https://nssweatherapp.firebaseio.com");

    (document).on('click', '#login', function(){
      user = $('#username').val();
      pass = $('#password').val();
      loginReg.getLogin(user, pass)

    })




    (document).on('click', '#login', function(){
      user = $('#username').val();
      pass = $('#password').val();
      loginReg.getRegister(user, pass)

    })
   //login
  
    //filter back to all

    
    });














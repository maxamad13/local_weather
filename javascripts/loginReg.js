define(["jquery","firebase"], function($,firebase){
	
	var firebaseRef = new firebase("https://nssweatherapp.firebaseio.com");

	return {
		getLogin: function(emailArg, passwordArg) {
			firebaseRef.authWithPassword({
				email 	 : emailArg,
				password : passwordArg
			}, function(error, authData) {
				if (error) {
				} else {
					$('#register').hide();
					$('#zipSearch').show();
				}
			});
		},
		getRegister: function(email, pass){
			//creates user 
			firebaseRef.createUser({
				email    : email,
				password : pass
			}, function(error, userData) {
				if (error) {
				} else {
					//creating a child with uid and a child setting first value with user email
					firebaseRef.child('users').child(userData.uid).child('email').set(email);
					$('#register').hide();
					$('#zipSearch').show();
				}
			});
		}
	};
});
define(["jquery","firebase"], function($,firebase){
	
	var firebaseRef = new firebase("https://nssweatherapp.firebaseio.com");

	return {
		getLogin: function(emailArg, passwordArg) {
			firebaseRef.authWithPassword({
					email 	 : emailArg,
					password : passwordArg
			}, function(error, authData) {
				if (error) {
					console.log("Login Failed!", error);
				} else {
					console.log("login successful");
					$('#register').hide();

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
						console.log("Error creating user:", error);
					} else {
						//creating a child with uid and setting first value with user email
						firebaseRef.child('users').child(userData.uid).child('email').set(email);
						console.log("user created");
					}
			});
		}
	};












});
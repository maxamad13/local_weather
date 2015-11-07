define(["jquery","firebase","q"], function($,firebase,q){
	
	var firebaseRef = new firebase("https://nssweatherapp.firebaseio.com");

	return {
		getLogin: function(emailArg, passwordArg) {
			var deferred = q.defer();
			firebaseRef.authWithPassword({
				email 	 : emailArg,
				password : passwordArg
			}, function(error, authData) {
				if (error) {
				} else {
					deferred.resolve(authData.uid);
					$('#register').hide();
					$('#zipSearch').show();
				}
			});
			return deferred.promise;
		},
		getRegister: function(email, pass){
			//creates user 
			var deferred = q.defer();
			firebaseRef.createUser({
				email    : email,
				password : pass
			}, function(error, userData) {
				if (error) {
				} else {
					deferred.resolve(userData.uid);
					//creating a child with uid and a child setting first value with user email
					firebaseRef.child('users').child(userData.uid).child('email').set(email);
					$('#register').hide();
					$('#zipSearch').show();
				}
			});
			return deferred.promise;
		}
	};
});
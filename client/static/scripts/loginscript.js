
angular.controller('login', function($scope, registerfactory, $window){
	var cookies = document.cookie.split(";");
		for (var i = 0; i < cookies.length;i++){
			var cookie = cookies[i];
	    	var eqPos = cookie.indexOf("=");
	    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
	    	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		}
	$scope.errors = [];
	$scope.success = false;

	$scope.register = function(){
		

		$scope.success = false;
		$scope.errors = [];
		//console.log($scope.box);
		
			registerfactory.register($scope.box, function(data){
				$scope.errors = data;
				if($scope.errors[0] == "Username Taken!"){
					//console.log($scope.errors);
				}
				else{
					$scope.errors = [];
					$scope.success = true;
				}
				$scope.box = "";
			});
		

	}
	$scope.login = function(){
		$scope.errors = [];
		registerfactory.login($scope.box2, function(data){
			
			$scope.errors = data
			if ($scope.errors.length == 0){
				$window.location.href = '#/home';
			}
		});
		$scope.box2 = "";

	}
})

angular.factory('registerfactory', function($http){
	var errors = [];
	var functions = {};

		functions.register = function(data, callback){
			errors = [];
			$http.post('/register', data).success(function(result){
				errors.push(result);
				callback(errors);
			})
		}
		functions.login = function(data, callback){
			$http.post('/login', data).success(function(result){
				errors = [];
				if (result == "No User"){
					errors = ["Cannot find User"];
				}
				else if( result == "Password Wrong"){
					errors = ["Password is Wrong"];
				}
				else{
					document.cookie = result;
					
				}

				callback(errors);
			})
		}
		
	return functions;
})
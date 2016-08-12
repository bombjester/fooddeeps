
angular.controller('login', function($scope, registerfactory, $window){
	$scope.errors = [];
	$scope.success = false;

	$scope.register = function(){
		$scope.success = false;
		$scope.errors = [];
		console.log($scope.box);
		
			registerfactory.register($scope.box, function(data){
				$scope.errors = data;
				if($scope.errors[0] == "Username Taken!"){
					console.log($scope.errors);
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
	var session = [];

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
				session = [];
				if (result == "No User"){
					errors = ["Cannot find User"];
				}
				else if( result == "Password Wrong"){
					errors = ["Password is Wrong"];
				}
				else{
					
					session.push({status:"Online", user: result});
					
				}

				callback(errors);
			})
		}
		functions.session = function(callback){
			callback(session);
		}
	return functions;
})
var app = angular.module('starter')

app.controller('signupController',function($scope,$http,$state){
    $scope.user={};
	$scope.attemptSignup= function(eve)
	{
		console.log($scope.user);
		$http.post("/api/signup",{data:$scope.user})
		.success(function(response){
			console.log(response);
			$state.go("login")
		})		
		.error(function(err){
			console.log(err);
		})
	}
})
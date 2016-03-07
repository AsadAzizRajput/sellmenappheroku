var app = angular.module('starter')

app.controller('loginController',function($scope,$http,$state){
    $scope.user={};
	if($scope.user.email=="" && $scope.user.password=="" )
	{
		alert("Please Your Username And Password");
	}
	$scope.attempLogin=function()
	{
		//console.log($scope.user);
		$http.post("/api/login",{data:$scope.user})
		.success(function(response){
			console.log("res"+response);
			if(response=="No user found with supplied email")
			{
				alert("Your are not signup")
				$scope.user={};
			}

			console.log("res.token"+response.token);
			if(response.token){
				localStorage.setItem('token',response.token);
				//localStorage.setItem('',response.token);
				$state.go("dashboard");
			}
		})
		.error(function(err){

			alert("sadas");
			console.log(err);
		});
	};
})
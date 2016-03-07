var app = angular.module('starter')

app.controller('addSalesmenController',function($scope,$http,$state){
	$scope.user={
	};
	//var a = localStorage.getItem("token");
	$scope.attemptSignupSellmen= function(eve)
	{
		console.log($scope.user);
		$scope.user.AdminId = localStorage.getItem("token");
		$http.post("/api/addsellmen",{data:$scope.user})
		.success(function(response){
			console.log(response);
			alert("Sellsmen Added");
			$scope.user={
			};
			$state.go("dashboard")
		})		
		.error(function(err){
			console.log(err);
		})
	}
	
})









 angular.module('starter')

app.controller('dashboardController',function($scope,MyService,$firebaseArray,$state){

	 $scope.Alluser = [];
		MyService.getsellmen().then(function(res){
			$scope.Alluser = res.userAll;
			//$scope.orders = res.order;
            console.log("------Alluser--------");
			console.log($scope.Alluser);


		//console.log($scope.Alluser);
		})
	  $scope.addCompany = function(){
		alert("Feature Coming Soon");
	}
$scope.logOut =function(){
localStorage.removeItem('token');
$state.go('login')
}


	
	//ref.on('child_added', function (childSnapshot, prevChildKey) {
	//	$ionicPopup.alert({
	//		title: 'Order Alert',
	//		template: 'New Order Placed'
	//	});
    //
	//});


    console.log($scope.orders);

})

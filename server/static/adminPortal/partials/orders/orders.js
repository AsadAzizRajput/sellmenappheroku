var app = angular.module('starter')

app.controller('ordersController',function($scope,$http,$state,$firebaseArray){
    $scope.user={};
    var ref = new Firebase("https://sellmenapp.firebaseio.com/order");


    $scope.orders=[];

    console.log("------Orders--------");

    console.log($scope.orders);
    $scope.orders = $firebaseArray(ref);

    console.log("------$firebaseArray--------");


    console.log($scope.orders);

    $scope.orderComplete = function (order) {
        $scope.orders.$remove(order);
        alert("Order Complete")

    }

    $scope.signOut=function()
    {
        alert("Sigout");
    }
})
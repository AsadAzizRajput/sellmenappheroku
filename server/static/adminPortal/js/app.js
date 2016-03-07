angular.module('starter', ['ui.router','firebase'])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    //$urlRouterProvider.otherwise("/login");
    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "/adminPortal/partials/login/login.html",
        controller: 'loginController'
        //template:"<input type='text'>"
      })
      .state('signup', {
        url: "/signup",
        templateUrl: "/adminPortal/partials/signup/signup.html",
        controller: 'signupController'
        //template:"<input type='text'>"
      })
      .state('dashboard', {
        url: "/dashboard",
        templateUrl: "/adminPortal/partials/dashboard/dashboard.html",
        controller: 'dashboardController',
        loginCompulsory: true
      })
      .state('addsellmen', {
        url: "/addsellmen",
        templateUrl: "/adminPortal/partials/addsalesmen/addsalesmen.html",
        controller: 'addSalesmenController'
        //template:"<input type='text'>"
      })
        .state('orders', {
            url: "/orders",
            templateUrl: "/adminPortal/partials/orders/orders.html",
            controller: 'ordersController'
            //template:"<input type='text'>"
        })

    $urlRouterProvider.otherwise("/login");
    $httpProvider.interceptors.push('httpInterceptor');
  })

  .run(function ($rootScope, $state) {

    $rootScope.$on("$stateChangeStart", function (event, toState) {
      var firebaseLocalToken = localStorage.getItem("token");
      //console.log("Yae rootscope wala hai" + firebaseLocalToken);
      if (toState.loginCompulsory && !firebaseLocalToken) {
        event.preventDefault();
        $state.go("login");
      }

    });

  })

  // .factory("httpInterceptor", function(){
  //   return {
  //     request : function(config){
  //       var token = localStorage.getItem("token");
  //       if(token){
  //         config.url = config.url + "?token="+token;
  //       }
  //       return config;
  //     }
  //      }       
  // });
  /*
  
  
    
    .factory("httpInterceptor",function(){
      var Allusers={};
      var factory={};
      factory.request=function(config)
      {
        var token = localStorage.getItem("token");
        if(token){
          config.url = config.url + "?token="+token;
        }
        return config;
      } 
      
       factory.getsalesmen=function($http,$q)
      {
        var q = $q.defer();
                      $http.get('/api/salesman')
                        .success(function(response){
                            console.log(response.userAll);
                            Allusers = response.userAll;
                            q.resolve(response);
                        })
                        
                        .error(function(err){
                            q.reject(err);
                        })
        return q.promise;
      }      
      return factory;
    });*/
      
      
      
      
      
     .factory("httpInterceptor" , function(){
              return{                
                  request : function(config){
                  var token = localStorage.getItem("token");
                  if(token){
                  config.url = config.url + "?token="+token;
                 }
                return config;
                }
                  
                  
              }
          })  
          
        .service('MyService', function($http,$q) {
          this.getsellmen = function() {
          var q =$q.defer(); 
          $http.get('/api/getsalesmen')
          .success(function(response){
          //console.log(response.userAll);
         //var Allusers = response.userAll;

         q.resolve(response);
        })      
        .error(function(err){
          q.reject(err);
        })
        return q.promise;
          
        }
});
      
      
      
      
  //------------------------//
  //---------------------------------------
  /*
    module.factory('Myservices',function(){
      
      var factory={};
      factory.request=fucntion()
      {
        return:
      } 
      
      factory.request=fucntion()
      {
        return:
      }       
      
      return factory;
      
    })
  */
      //--------------------------------------
      // getSalesmen : function(){
      // var q =$q.defer(); 
      //   $http.get('/api/getsalesmen')
      //   .success(function(response){
      //     console.log(response.userAll);                  
      //    var Allusers = response.userAll;
      //    q.resolve(response);
      //   })      
      //   .error(function(err){
      //     q.reject(err);
      //   })
      //   return q.promise;
      // }
      
      
      
   
  
  // .factory("myfactory" , function($http,$q){
  //             return{

                
  //                 salesusers: function(){
  //                     var q = $q.defer();
  //                     $http.get('/api/salesman')
  //                       .success(function(response){
  //                           console.log(response.userAll);
                              
  //                           var Allusers = response.userAll;
  //                           q.resolve(response);
  //                       })
                        
  //                       .error(function(err){
  //                           q.reject(err);
  //                       })
  //                       return q.promise;
  //                 } 
  //             }
  //         })
  
//   .factory("myfactory" , function($http,$q){
//               return{
//                   salesusers: function(){
//                       var q = $q.defer();
//                       $http.get('/api/salesman')
//                         .success(function(response){
//                             //console.log(response.userAll);
//                             var Alluser={};
//                             Alluser = response.userAll;
//                             console.log("All Sellmen"+Alluser);
//                             q.resolve(response);
//                         })
                        
//                         .error(function(err){
//                             q.reject(err);
//                         })
//                         return q.promise;
//                   } 
//               }
//           })



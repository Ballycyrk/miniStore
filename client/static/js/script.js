var ballyCyrk = angular.module('ballyCyrk', ['ngRoute']);

// -----ROUTES-------
ballyCyrk.config(function($routeProvider){
  $routeProvider
  .when('/users', {
    templateUrl: 'partials/_users.html',
    controller: 'usersController'
  })
  .when('/orders', {
    templateUrl: '/partials/_orders.html',
    controller: 'ordersController'
  })
  .otherwise({ redirectTo: '/users'});
});

// --------FACTORIES--------------
ballyCyrk.factory('userFactory', function(){
  var users = [];
  var factory = {};
  factory.index = function(callback){ callback(users); };
  factory.create = function(user){
    user.created_at = new Date();
    users.push(user);
  };
  factory.delete = function(user, callback){
    users.splice(users.indexOf(user),1);
    callback();
  };

  return factory;
});

ballyCyrk.factory('productFactory', function(){
  var products = [
    {name: "Dingleberries"},
    {name: "Sounders Jersey"},
    {name: "XBox One"},
    {name: "Nikon D7100"},
    {name: "Intiman Theatre Subscription"}
  ];
  var factory = {};
  factory.index = function(callback){ callback(products); };
  return factory;
});

ballyCyrk.factory('orderFactory', function(){
  var orders = [];
  var factory = {};
  factory.index = function(callback){ callback(orders); };
  factory.create = function(order){
    order.created_at = new Date();
    orders.push(order);
    console.log(orders)
  }
  return factory;
});

// -----------------CONTROLLERS-------------------
ballyCyrk.controller('usersController', function($scope, userFactory){
  $scope.index      = function(){
    userFactory.index(function(data){ $scope.users = data; });
  };
  $scope.addUser    = function(){
    userFactory.create($scope.newUser);
    $scope.newUser  = {};
  };
  $scope.deleteUser = function($user){
    userFactory.delete($user, $scope.index);
  };
  $scope.index();
});

ballyCyrk.controller('ordersController', function($scope, orderFactory, userFactory, productFactory){
  userFactory.index(function(data) { $scope.users = data });
  productFactory.index(function(data) { $scope.products = data });
  orderFactory.index(function(data){ $scope.orders = data; });
  $scope.addOrder = function(){
    orderFactory.create($scope.newOrder);
    $scope.newOrder = {};
     };
});

angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
    .when('/', { templateUrl: '/partials/video', controller: 'videoCtrl'});


});

angular.module('app').controller('videoCtrl', function($scope){
	$scope.videoVar = " Video Angular";
	
});
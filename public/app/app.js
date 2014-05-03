angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/', { templateUrl: '/partials/main', controller: 'ptvMainCtrl'})
    .when('/videos', { templateUrl: '/partials/videos', controller: 'ptvVideosCtrl'});
});

angular.module('app').controller('ptvMainCtrl', function($scope){
	$scope.intro = "Propeller TV is the premium channel for the UK-China community. Watch us for business, culture and entertainment. We broadcast and produce high quality bi-lingual programmes and our mission is to build bridges that strengthen cultural exchange and economic development between the UK and China.";
});

angular.module('app').controller('ptvVideosCtrl', function($scope){
	$scope.videosVar = "videos";
});
angular.module('myApp', ['ngRoute', 'ngAnimate'])

.value('owmCities', [
    'New York',
    'Houston',
    'Chicago',
    'Los Angeles',
    'Boston',
    'Seattle'
    ])

.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'HomeCtrl as home'
        })
        .when('/error', {
            template: '<p>Sorry, no dice. Try again?</p>'
        })
        .when('/cities/:city', {
            templateUrl: 'city.html',
            controller: "CityCtrl",
            resolve: {
                city: function (owmCities, $route, $location) {
                    var city = $route.current.params.city;

                    if (owmCities.indexOf(city) === -1) {
                        $location.path('/error');
                        return;
                    }
                    return city;
                }
            }
        })
        .otherwise({
            redirectTo: "/error"
        })

})

.run(function ($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function () {
        $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        $timeout(function () {
            $rootScope.isLoading = false;
        }, 1000);
    });
})

.controller('HomeCtrl', function ($scope) {
    this.welcomeMessage = "Welcome home!";
})

.controller('CityCtrl', function ($scope, city) {
    $scope.city = city;
})

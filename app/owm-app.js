angular.module('myApp', ['ngRoute'])

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

.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function () {
        $location.path('/error');
    })
})

.controller('HomeCtrl', function ($scope) {
    this.welcomeMessage = "Welcome home!";
})

.controller('CityCtrl', function ($scope, city) {
    $scope.city = city;
})

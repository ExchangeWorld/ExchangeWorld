(function () {
    var templateUrlDircetive = angular.module('templateUrlDircetive', ['ngScrollable']);

    templateUrlDircetive.directive('navbar', function () {
        return {
            restrict: 'E',
            templateUrl: "views/navbar.html"
        };
    });

    templateUrlDircetive.directive('sidenav', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/sidenav.html',
            controller: ['$scope','sharedProperties','$mdSidenav',function ($scope, sharedProperties, $mdSidenav) {

                $scope.contentType = sharedProperties.getString();
                $scope.$on('sidenavChanged', function (event, message) {
                    $scope.contentType = message;
                });

                $scope.closeMenu = function () {
                    $mdSidenav('left').close();
                };
            }]
        };
    });
})();
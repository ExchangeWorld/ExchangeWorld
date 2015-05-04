(function () {
    var mapController = angular.module('mapController', ['ngMap','geolocation']);

    mapController.directive('mapBlock', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/map.html',
            controller: 'mapCtrl'
        };
    });
    
    mapController.controller('mapCtrl',['$scope','geolocation',function($scope,geolocation){
        
        var marker, map;
        $scope.$on('mapInitialized', function(evt, evtMap) {
          map = evtMap;
        });
        
        $scope.mapStyle = [
        {
            "featureType": "all",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#eaeaea"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [
                {
                    "weight": 0.9
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape.natural.landcover",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#83cead"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "saturation": "0"
                },
                {
                    "lightness": "0"
                },
                {
                    "color": "#515151"
                },
                {
                    "weight": "0.40"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#fee379"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#fee379"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#222222"
                },
                {
                    "weight": "0.50"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#7fc8ed"
                }
            ]
        }
        ];
        
        $scope.coords = [0, 0];
        geolocation.getLocation().then(function(data){
          $scope.coords = [data.coords.latitude, data.coords.longitude];
        });
        
        $scope.$on('sidenavChanged', function (event, message) {
            $scope.contentType = message;
            if(message==='seek')
            {
                map.setOptions({draggableCursor:'default',draggingCursor:'default'});
            }
            else if(message==='post')
            {
                map.setOptions({draggableCursor:'crosshair',draggingCursor:'crosshair'});
            }
            else if(message==='profile')
            {
                map.setOptions({draggableCursor:'default',draggingCursor:'default'});
            }
        });
    }]);
})();
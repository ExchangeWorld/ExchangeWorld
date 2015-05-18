(function() {
  var mapController = angular.module('mapController', ['ngMap', 'geolocation']);

  mapController.directive('mapBlock', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/map.html',
      controller: 'mapCtrl'
    };
  });

  mapController.controller('mapCtrl',
    ['$scope', 'geolocation', '$location', '$timeout',
    function($scope, geolocation, $location, $timeout) {

    var marker, map;
    $scope.mapStyle = [{
      "featureType": "all",
      "elementType": "labels",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "administrative",
      "elementType": "labels.text",
      "stylers": [{
        "color": "#3a9464"
      }, {
        "weight": "0.7"
      }, {
        "gamma": "1"
      }]
    }, {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#eaeaea"
      }]
    }, {
      "featureType": "landscape.man_made",
      "elementType": "geometry",
      "stylers": [{
        "weight": 0.9
      }, {
        "visibility": "off"
      }]
    }, {
      "featureType": "landscape.natural",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "landscape.natural.landcover",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#83cead"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "geometry.stroke",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#150202"
      }]
    }, {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#ffffff"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels.text",
      "stylers": [{
        "saturation": "0"
      }, {
        "lightness": "0"
      }, {
        "weight": "0.4"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#f69017"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#ffb63b"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "hue": "#ff0000"
      }, {
        "visibility": "off"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#000000"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#fee379"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#202020"
      }, {
        "weight": "0.50"
      }, {
        "saturation": "0"
      }]
    }, {
      "featureType": "road.local",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "road.local",
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#2e2d2d"
      }]
    }, {
      "featureType": "road.local",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "water",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#7fc8ed"
      }]
    }, {
      "featureType": "water",
      "elementType": "labels.text",
      "stylers": [{
        "weight": "0.8"
      }, {
        "color": "#3e71bd"
      }]
    }];

    $scope.$on('mapInitialized', function(evt, evtMap) {
      map = evtMap;
      var centerChanging = false;

      $scope.centerChanged = function() {
        centerChanging = true;
        $timeout(function() {
          centerChanging = false;
        }, 599);

        $timeout(function() {
          if (!centerChanging) {
            var center = map.getCenter();
            $location.path('/seek').search('@' + center.lat()+','+center.lng() + ',' + map.getZoom() + 'z');
          }
        }, 600);
      };
    });

    $scope.$on('sidenavChanged', function(event, message) {
      $scope.contentType = message;
      if (message === 'seek') {
        map.setOptions({
          draggableCursor: 'default',
          draggingCursor: 'default'
        });
      } else if (message === 'post') {
        map.setOptions({
          draggableCursor: 'crosshair',
          draggingCursor: 'crosshair'
        });
      } else if (message === 'profile') {
        map.setOptions({
          draggableCursor: 'default',
          draggingCursor: 'default'
        });
      }
    });

    $scope.$on('goodsReceived', function(evt, data) {

    });

    //-----------Location-----------
    $scope.coords = [0, 0];
    geolocation.getLocation().then(function(data) {
      $scope.coords = [data.coords.latitude, data.coords.longitude];
      $location.path('/seek').search('@' + $scope.coords[0] + ',' + $scope.coords[1] + ',' + '17z');
    });

    $scope.findMyLocation = function() {
      geolocation.getLocation().then(function(data) {
        map.panTo({
          lat: data.coords.latitude,
          lng: data.coords.longitude
        });
      });
    };

    $scope.placeChanged = function() {
      var place = this.getPlace().geometry;
      if (place.viewport)
        map.panToBounds(place.viewport);
      else
        map.panTo(place.location);
    };
    //---------------------



  }]);
})();

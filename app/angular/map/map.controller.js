"use strict";

const mapModule = require('./map.module');

// Controller name 'MapController' has been used by ng-map
mapModule.controller('MapCtrl', MapController);

/** @ngInject */
function MapController($scope, geolocation, $timeout) {
	var map;
	const vm          = this;
	vm.mapStyle       = [
		{
			"featureType" : "all",
			"elementType" : "labels",
			"stylers" : [
				{
					"visibility" : "on"
				}
			]
		},
		{
			"featureType" : "administrative",
			"elementType" : "labels.text",
			"stylers" : [
				{
					"color" : "#3a9464"
				}, {
					"weight" : "0.7"
				}, {
					"gvmma" : "1"
				}
			]
		}, {
			"featureType" : "landscape",
			"elementType" : "all",
			"stylers" : [
				{
					"visibility" : "on"
				}, {
					"color" : "#eaeaea"
				}
			]
		}, {
			"featureType" : "landscape.man_made",
			"elementType" : "geometry",
			"stylers" : [
				{
					"weight" : 0.9
				}, {
					"visibility" : "off"
				}
			]
		}, {
			"featureType" : "landscape.natural",
			"elementType" : "labels.icon",
			"stylers" : [
				{
					"visibility" : "off"
				}
			]
		}, {
			"featureType" : "landscape.natural.landcover",
			"elementType" : "all",
			"stylers" : [
				{
					"visibility" : "on"
				}
			]
		}, {
			"featureType" : "poi",
			"elementType" : "all",
			"stylers" : [
				{
					"visibility" : "off"
				}
			]
		}, {
			"featureType" : "poi",
			"elementType" : "labels.icon",
			"stylers" : [
				{
					"visibility" : "off"
				}
			]
		}, {
			"featureType" : "poi.park",
			"elementType" : "geometry.fill",
			"stylers" : [
				{
					"visibility" : "on"
				}, {
					"color" : "#83cead"
				}
			]
		}, {
			"featureType" : "poi.park",
			"elementType" : "geometry.stroke",
			"stylers" : [
				{
					"visibility" : "on"
				}, {
					"color" : "#150202"
				}
			]
		}, {
			"featureType" : "road",
			"elementType" : "all",
			"stylers" : [
				{
					"visibility" : "on"
				}, {
					"color" : "#ffffff"
				}
			]
		}, {
			"featureType" : "road",
			"elementType" : "labels",
			"stylers" : [
				{
					"visibility" : "on"
				}
			]
		}, {
			"featureType" : "road",
			"elementType" : "labels.text",
			"stylers" : [
				{
					"saturation" : "0"
				}, {
					"lightness" : "0"
				}, {
					"weight" : "0.4"
				}
			]
		}, {
			"featureType" : "road.highway",
			"elementType" : "all",
			"stylers" : [
				{
					"visibility" : "on"
				}, {
					"color" : "#f69017"
				}
			]
		}, {
			"featureType" : "road.highway",
			"elementType" : "geometry.fill",
			"stylers" : [
				{
					"color" : "#ffb63b"
				}
			]
		}, {
			"featureType" : "road.highway",
			"elementType" : "geometry.stroke",
			"stylers" : [
				{
					"hue" : "#ff0000"
				}, {
					"visibility" : "off"
				}
			]
		}, {
			"featureType" : "road.highway",
			"elementType" : "labels.text",
			"stylers" : [
				{
					"visibility" : "on"
				}, {
					"color" : "#000000"
				}
			]
		}, {
			"featureType" : "road.highway",
			"elementType" : "labels.icon",
			"stylers" : [
				{
					"visibility" : "off"
				}
			]
		}, {
			"featureType" : "road.arterial",
			"elementType" : "all",
			"stylers" : [
				{
					"visibility" : "on"
				}, {
					"color" : "#fee379"
				}
			]
		}, {
			"featureType" : "road.arterial",
			"elementType" : "labels.text",
			"stylers" : [
				{
					"visibility" : "on"
				}, {
					"color" : "#202020"
				}, {
					"weight" : "0.50"
				}, {
					"saturation" : "0"
				}
			]
		}, {
			"featureType" : "road.local",
			"elementType" : "all",
			"stylers" : [
				{
					"visibility" : "on"
				}
			]
		}, {
			"featureType" : "road.local",
			"elementType" : "labels.text",
			"stylers" : [
				{
					"visibility" : "on"
				}, {
					"color" : "#2e2d2d"
				}
			]
		}, {
			"featureType" : "road.local",
			"elementType" : "labels.icon",
			"stylers" : [
				{
					"visibility" : "off"
				}
			]
		}, {
			"featureType" : "water",
			"elementType" : "all",
			"stylers" : [
				{
					"visibility" : "on"
				}, {
					"color" : "#7fc8ed"
				}
			]
		}, {
			"featureType" : "water",
			"elementType" : "labels.text",
			"stylers" : [
				{
					"weight" : "0.8"
				}, {
					"color" : "#3e71bd"
				}
			]
		}
	];
	vm.coords         = [0, 0];
	vm.findMyLocation = getCurrentPosition;
	vm.placeChanged   = placeChanged;
	$scope.$on('mapInitialized', mapInitialized);
	//$scope.$on('sidenavChanged', sidenavChanged);

	activate();

	function mapInitialized(evt, evtMap) {
		map = evtMap;
		vm.onResize = onResize;

		function onResize() {
			google.maps.event.trigger(map, 'resize');
		}
	}



	//function sidenavChanged(event, message) {
	//	vm.contentType = message;
	//}

	function getCurrentPosition() {
		geolocation
			.getLocation()
			.then(function(data) {
				map.panTo({
					lat : data.coords.latitude,
					lng : data.coords.longitude
				});
			});
	}

	function placeChanged() {
		var place = this.getPlace().geometry;
		if (place.viewport) {
			map.panToBounds(place.viewport);
		} else {
			map.panTo(place.location);
		}
	}

	function activate() {
		geolocation
			.getLocation()
			.then(function(data) {
				console.log(data);
				vm.coords = [data.coords.latitude, data.coords.longitude];
			});
	}
};
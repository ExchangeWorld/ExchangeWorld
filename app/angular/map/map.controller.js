"use strict";

const mapModule  = require('./map.module');
const _          = require('lodash');
var GoodsOverlay = require('./GoodsOverlay.js');

// Controller name 'MapController' has been used by ng-map
mapModule.controller('MapCtrl', MapController);

/** @ngInject */
function MapController(
		$scope,
		geolocation,
		OpenLocationCode,
		$state,
		$stateParams,
		$rootScope,
		$timeout
) {

	var map     = undefined;
	var goods   = [];
	var overlay = undefined;
	const vm    = this;
	vm.mapStyle = [
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
	vm.coords   = [0, 0];
	vm.zoom     = 17;
	$scope.$on('mapInitialized', mapInitialized);

	activate();

	/* After map is loaded */
	function mapInitialized(e, evtMap) {
		map                    = evtMap;
		vm.onResize            = onResize;
		vm.findMyLocation      = getCurrentPosition;
		vm.placeChanged        = placeChanged;
		vm.zoomChanged         = zoomChanged;
		GoodsOverlay.prototype = new google.maps.OverlayView();

		boundChanged();
		$scope.$on('goodsChanged', goodsChanged);
		$rootScope.$on('$stateChangeSuccess', urlChanged);
		google.maps.event.addListener(map, 'idle', olcChanged);
		google.maps.event.addListener(map, 'bounds_changed', boundChanged);

		overlay = new GoodsOverlay(map);
	}

	/* Before map is loaded */
	function activate() {
		if ($stateParams.olc) {
			const coord = OpenLocationCode.decode($stateParams.olc.replace(' ','+'));
			vm.coords = [coord.latitudeCenter, coord.longitudeCenter];
		} else {
			geolocation
				.getLocation()
				.then(function(data) {
					vm.coords = [data.latitude, data.longitude];
				});
		}

		if (!isNaN($stateParams.z)) {
			vm.zoom = parseInt($stateParams.z, 10);
		}
	}

	function getCurrentPosition() {
		geolocation
			.getLocation()
			.then(function(data) {
				map.panTo({
					lat : data.latitude,
					lng : data.longitude
				});
			});
	}

	/**
	 * Search goods when bound of map changed;
	 * Send the bound of map to seek.controller
	 */
	var isMoving = false;
	var timer    = undefined;
	function boundChanged() {

		if(timer) {
			$timeout.cancel(timer);
			timer = undefined;
		}

		$timeout(function() {
			if (!isMoving) {
				/* TODO: transform the bound into the foramt that service need */
				const bound = map.getBounds();
				$rootScope.$broadcast('boundChanged', bound)
			}
		}, 50);

		isMoving = true;
		timer = $timeout(function() {
			isMoving = false;
		}, 49);
	}

	/**
	 * TODO : Receive the goods from seek controller
	 * Draw maker and overlay here.
	 */
	function goodsChanged(e, data) {

		/* 1. Clean unused marker */
		// goods = _.chain(data).merge()
		/* 2. Draw new Maker on map */
		/* 3. Click Event that transistTo seek/:gid */
		/* 4. Generate a overlay when the mouse is on a marker */
		/* 4. Delete the overlay when the mouse is out of the marker */

		goods = data.forEach(function(good) {
			const marker = new google.maps.Marker({
				position: new google.maps.LatLng(good.position_y, good.position_x),
				map: map
			});

			marker.addListener('click', function() {
				console.log('marker '+ good.gid + ' is clicked');
			});

			marker.addListener('mouseover', function() {
				console.log('marker '+ good.gid + ' is mouseover');
			});

			return {
				id : good.gid,
				img : good.photo_path,
				category : good.category,
				marker : marker,
			};
		});

	}

	/**
	 * When state go to new olc or zoom, move map to proper position.
	 * (This event will not trigger after reloading page)
	 */
	function urlChanged(event, toState, toParams, fromState, fromParams) {
		if(toParams.olc) {
			const coord = OpenLocationCode.decode(toParams.olc.replace(' ','+'));
			map.panTo({
				lat : coord.latitudeCenter,
				lng : coord.longitudeCenter
			})
		}
		if (!isNaN($stateParams.z)) {
			map.setZoom(parseInt($stateParams.z, 10))
		}
		boundChanged();
	}

	/* Autocomplete address Search */
	function placeChanged() {
		const place = this.getPlace().geometry;
		if (place.viewport) {
			map.panToBounds(place.viewport);
		} else {
			map.panTo(place.location);
		}
	}

	/* idle event */
	function olcChanged() {
		$state.go($state.current.name, {
			olc : OpenLocationCode.encode(map.getCenter().lat(), map.getCenter().lng()),
		}, {
			location : 'replace',
			notify : false,
		});
	}

	/* on-zoom_changed event */
	function zoomChanged() {
		$state.go($state.current.name, {z: map.getZoom()} , {
			location : 'replace',
			notify : false,
		});
	}

	/* Manually trigger map resize event due to resize directive*/
	function onResize() {
		google.maps.event.trigger(map, 'resize');
	}

};

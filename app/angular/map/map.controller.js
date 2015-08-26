"use strict";

const mapModule  = require('./map.module');
const _          = require('lodash');
var GoodsOverlay = require('./GoodsOverlay.js');

// Controller name 'MapController' has been used by ng-map
mapModule.controller('MapCtrl', MapController);

/** @ngInject */
function MapController(
		$scope,
		$rootScope,
		geolocation,
		OpenLocationCode,
		$localStorage,
		$state,
		$stateParams,
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
	vm.coords   = $localStorage ? $localStorage.position : [0, 0];
	vm.zoom     = 17;
	vm.draggableCursor = 'default';
	vm.draggingCursor = 'default';
	$scope.$on('mapInitialized', mapInitialized);


	activate();

	/* After map is loaded */
	function mapInitialized(e, evtMap) {
		map                    = evtMap;
		vm.findMyLocation      = getCurrentPosition;
		vm.placeChanged        = placeChanged;
		vm.zoomChanged         = zoomChanged;
		vm.onClick             = onClick;
		GoodsOverlay.prototype = new google.maps.OverlayView();

		boundChanged();
		$scope.$on('goodsChanged', goodsChanged);
		$scope.$on('mapMoveTo', mapMoveTo)
		$scope.$on('openGoodsOverlay', openGoodsOverlay);
		$scope.$on('closeGoodsOverlay', closeGoodsOverlay);
		$rootScope.$on('$stateChangeSuccess', urlChanged);
		google.maps.event.addListener(map, 'idle', olcChanged);
		google.maps.event.addListener(map, 'bounds_changed', boundChanged);
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
					$localStorage.position = [data.latitude, data.longitude];
					vm.coords = [data.latitude, data.longitude];
				});
		}
		if (!isNaN($stateParams.z)) {
			vm.zoom = parseInt($stateParams.z, 10);
		}

		if ($state.current.title === 'post') {
			vm.draggableCursor = 'crosshair';
			vm.draggingCursor = 'crosshair';
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

		/* Manually trigger map resize event due to resize directive*/
		google.maps.event.trigger(map, 'resize');

		if(timer) {
			$timeout.cancel(timer);
			timer = undefined;
		}

		$timeout(function() {
			if (!isMoving) {
				/* TODO: transform the bound into the foramt that service need */
				const bound = map.getBounds();
				$rootScope.$broadcast('boundChanged', bound);
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
		var hashTable = {};
		data.forEach(function(obj) { hashTable[obj.gid] = true; });
		goods
			.filter(function(good, index) {
				if (!(good.gid in hashTable)) return true;

				console.log(good.gid + ' is already rendered.');
				data[index] = good;
				return false;
			})
			.forEach(function(oldGood) {
					oldGood.marker.setMap(null);
			});

		/* 2. Draw new Maker on map */
		goods = data.map(function(good) {
			if (good.marker) {
				return good;
			}

			const marker = new google.maps.Marker({
				position: new google.maps.LatLng(good.position_y, good.position_x),
				map: map
			});

			good = {
				gid : good.gid,
				img : good.photo_path,
				category : good.category,
				marker : marker,
			};

			/* 3. Click Event that Generate a new overlay which can transistTo state of goods */
			marker.addListener('click', function() {
				if (overlay) {
					overlay.onRemove();
					overlay = undefined;
				}

				overlay = new GoodsOverlay(map, good, $state);
			});

			return good;
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
			});
		}
		if (!isNaN($stateParams.z)) {
			map.setZoom(parseInt($stateParams.z, 10));
		}

		if (toState.title === 'post') {
			map.setOptions({ draggableCursor:'crosshair', draggingCursor: 'crosshair'});
		} else {
			map.setOptions({ draggableCursor:'default', draggingCursor: 'default'});
			if (vm.marker) {
				vm.marker.setMap(null);
				vm.marker = undefined;
			}
			boundChanged();
		}
	}

	/* Autocomplete address Search */
	function placeChanged() {
		if(overlay) {
			overlay.onRemove();
			overlay = undefined;
		}

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

	function mapMoveTo(e, gid) {
		map.panTo(_findGood(gid).marker.getPosition());
	}

	function openGoodsOverlay(e, gid) {
		if (overlay) {
			overlay.onRemove();
			overlay = undefined;
		}
		overlay = new GoodsOverlay(map, _findGood(gid), $state);
	}

	function closeGoodsOverlay() {
		if (overlay) {
			overlay.onRemove();
			overlay = undefined;
		}
	}

	function onClick(e) {
		if (overlay) {
			overlay.onRemove();
			overlay = undefined;
		}

		if ($state.current.title === 'post') {
			if (vm.marker) {
				vm.marker.setPosition(e.latLng);
			} else {
				vm.marker = new google.maps.Marker({
					position: e.latLng,
					draggable: true,
					animation: google.maps.Animation.DROP,
					map: map,
				});

				google.maps.event.addListener(vm.marker, 'dragend', function() {
					$rootScope.$broadcast('positionMarked', e.latLng);
				});
			}
			$rootScope.$broadcast('positionMarked', e.latLng);
		}
	}

	function _findGood(gid) {
		return _.where(goods, {gid : gid})[0];
	}
}

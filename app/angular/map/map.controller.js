/* global google*/
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

	var map     = null;
	var goods   = [];
	var overlay = null;
	const vm    = this;

	vm.coords          = $localStorage ? $localStorage.position : [0, 0];
	vm.zoom            = 17;
	vm.draggableCursor = 'default';
	vm.draggingCursor  = 'default';
	vm.mapStyle        = require('./mapStyle.json');
	$scope.$on('mapInitialized', mapInitialized);


	activate();

	/* After map is loaded */
	function mapInitialized(e, evtMap) {
		map                    = evtMap;
		vm.findMyLocation      = getCurrentPosition;
		vm.placeChanged        = placeChanged;
		vm.zoomChanged         = zoomChanged;
		GoodsOverlay.prototype = new google.maps.OverlayView();

		boundChanged();
		$scope.$on('goodsChanged', goodsChanged);
		$scope.$on('mapMoveTo', mapMoveTo);
		$scope.$on('openGoodsOverlay', openGoodsOverlay);
		$scope.$on('closeGoodsOverlay', closeGoodsOverlay);
		$rootScope.$on('$stateChangeSuccess', urlChanged);
		google.maps.event.addListener(map, 'idle', olcChanged);
		google.maps.event.addListener(map, 'bounds_changed', boundChanged);
		google.maps.event.addListener(map, 'mousedown', onClick);
	}

	/* Before map is loaded */
	function activate() {
		if ($stateParams.olc) {
			const coord = OpenLocationCode.decode($stateParams.olc.replace(' ','+'));
			vm.coords = [coord.latitudeCenter, coord.longitudeCenter];
		} else if($stateParams.hasOwnProperty('olc')) {
			geolocation
				.getLocation()
				.then(function(data) {
					$localStorage.position = vm.coords = [data.latitude, data.longitude];
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
				$localStorage.position = [data.latitude, data.longitude];
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
		closeGoodsOverlay();

		/* 1. Clean unused marker */
		var hashTable = {};
		data.forEach(function(obj, index) { hashTable[obj.gid] = index; });
		goods
			.filter(function(good) {
				if (!(good.gid in hashTable)) return true;

				if (!good.marker.getMap()) good.marker.setMap(map);
				data[hashTable[good.gid]] = good;
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
				gid        : good.gid,
				owner_uid  : good.owner_uid,
				name       : good.name,
				photo_path : good.photo_path,
				category   : good.category,
				marker     : marker,
			};
			/* 3. Click Event that Generate a new overlay which can transistTo state of goods */
			marker.addListener('mousedown', function() {
				closeGoodsOverlay();
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
			const coord = OpenLocationCode.decode(toParams.olc.replace(' ', '+'));
			map.panTo({
				lat : coord.latitudeCenter,
				lng : coord.longitudeCenter
			});
		}
		if (!isNaN($stateParams.z)) {
			map.setZoom(parseInt($stateParams.z, 10));
		}

		if (_.isArray(goods) && goods.length) {
			goods.forEach(function(good) {
				good.marker.setMap(null);
			});
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
		closeGoodsOverlay();

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
		closeGoodsOverlay();
		overlay = new GoodsOverlay(map, _findGood(gid), $state);
	}

	function closeGoodsOverlay() {
		if (overlay) {
			overlay.onRemove();
			overlay = undefined;
		}
	}

	function onClick(e) {
		closeGoodsOverlay();

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

/* global google*/
"use strict";

const mapModule  = require('./map.module');
const _          = require('lodash');
let GoodsOverlay = require('./GoodsOverlay.js');
let MarkerOverlay = require('./MarkerOverlay.js');

// Controller name 'MapController' has been used by ng-map
mapModule.controller('MapCtrl', MapController);

/** @ngInject */
function MapController(
	NgMap,
	$scope,
	$rootScope,
	geolocation,
	OpenLocationCode,
	$localStorage,
	$state,
	$stateParams,
	$timeout,
	$mdSidenav
) {

	var map     = null;
	var goods   = [];
	var overlay = null;
	const vm    = this;

	vm.coords = $localStorage.position
		? $localStorage.position
		: [25.05517828690749, 121.54136714595292]; 
		// 政大 [24.98918974905472, 121.57591535186772];

	vm.zoom            = 12;
	vm.draggableCursor = 'default';
	vm.draggingCursor  = 'default';
	vm.olcRecord = { lat: vm.coords[0], lng: vm.coords[1] };
	vm.mapStyle        = require('./mapStyle.json');
	// $scope.$on('mapInitialized', mapInitialized);
	NgMap.getMap().then(mapInitialized);

	activate();

	/* After map is loaded */
	function mapInitialized(evtMap) {
		map               = evtMap;
		vm.findMyLocation = getCurrentPosition;
		vm.placeChanged   = placeChanged;
		vm.zoomChanged    = zoomChanged;
		MarkerOverlay.prototype = new google.maps.OverlayView();
		GoodsOverlay.prototype = new google.maps.OverlayView();

		$scope.$on('goodsChanged', goodsChanged);
		$scope.$on('mapMoveTo', mapMoveTo);
		$scope.$on('openGoodsOverlay', openGoodsOverlay);
		$scope.$on('closeGoodsOverlay', closeGoodsOverlay);
		$scope.$on('getBound', getBound);
		$rootScope.$on('$stateChangeSuccess', urlChanged);


		google.maps.event.addListener(map, 'idle', olcChanged);
		google.maps.event.addListener(map, 'bounds_changed', boundChanged);
		google.maps.event.addListener(map, 'mousedown', onMousedown);
		google.maps.event.addListener(map, 'mouseup', onMouseup);
		google.maps.event.addListener(map, 'dragstart', onDragstart);

		// activate();
		boundChanged();
	}

	/* Before map is loaded */
	function activate() {
		if ($stateParams.olc) {
			const coord = OpenLocationCode.decode($stateParams.olc.replace(' ','+'));
			vm.coords = [coord.latitudeCenter, coord.longitudeCenter];
			// map.panTo({
				// lat : coord.latitudeCenter,
				// lng : coord.longitudeCenter,
			// });
		// } else if ($stateParams.hasOwnProperty('olc')) {
		// 	geolocation
		// 		.getLocation({maximumAge:60000, timeout:5000, enableHighAccuracy:true})
		// 		.then(function(data) {
		// 			$localStorage.position = vm.coords = [data.latitude, data.longitude];
		// 		});
		}
		if (!isNaN($stateParams.z)) {
			vm.zoom = parseInt($stateParams.z, 10);
			// map.setZoom(parseInt($stateParams.z, 10));
		}

		if ($state.current.title === 'post') {
			vm.draggableCursor = 'crosshair';
			vm.draggingCursor  = 'crosshair';
			// map.setOptions({ 
			// 	draggableCursor:'crosshair', 
			// 	draggingCursor: 'crosshair'}
			// );
		}

		// vm.smallMap = $state.current.title === 'exchange';
	}

	function getCurrentPosition() {
		geolocation
			.getLocation({maximumAge:60000, timeout:5000, enableHighAccuracy:true})
			.then(function(data) {
				$localStorage.position = [data.latitude, data.longitude];
				map.panTo({
					lat : data.latitude,
					lng : data.longitude
				});
				map.setZoom(parseInt(vm.zoom, 10));
			});
	}

	/**
	 * Search goods when bound of map changed;
	 * Send the bound of map to seek.controller
	 */
	var isMoving = false;
	var timer    = undefined;
	function boundChanged() {
		// console.log(map.getCenter().toString());
		// console.log(map.getZoom());
		/* Manually trigger map resize event due to resize directive*/
		google.maps.event.trigger(map, 'resize');

		if (timer) {
			$timeout.cancel(timer);
			timer = undefined;
		}

		$timeout(function() {
			if (!isMoving) {
				const bound = map.getBounds();
				$rootScope.$broadcast('boundChanged', bound);

				if (
					bound.getNorthEast().lat() > 85 &&
					bound.getSouthWest().lat() < -85 
				) {
					const zoom = map.getZoom();
					map.setZoom(parseInt(zoom, 10) + 1);
				} else if (
					bound.getNorthEast().lat() > 85 ||
					bound.getSouthWest().lat() < -85 
				) {
					const originCenter = bound.getCenter();
					const latOffset = bound.getNorthEast().lat() > 85
						? bound.getNorthEast().lat() - 85
						: bound.getSouthWest().lat() + 85;
					map.panTo({
						lat : originCenter.lat() - latOffset,
						lng : originCenter.lng(),
					});
				}
			}
		}, 50);

		isMoving = true;
		timer = $timeout(function() {
			isMoving = false;
		}, 49);

	}

	function getBound() {
		if (map) return map.getBounds();

		return undefined;
	}

	/**
	 * Receive the goods from seek controller
	 * Draw maker and overlay here.
	 */
	function goodsChanged(e, data) {
		closeGoodsOverlay();

		/* 1. Clean unused marker */
		var hashTable = {};
		data.forEach( (obj, i) => hashTable[obj.gid] = i );

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

		/* 2. Draw new Marker on map */
		goods = data.map(function(good) {
			if (good.marker) {
				return good;
			}

			good.marker = new MarkerOverlay(
				map,
				good.category, 
				new google.maps.LatLng(good.position_y, good.position_x),
				map.getZoom()
			);
			// var icon = `../../images/mapMarker/${good.category}.png`;

			// good.marker = new google.maps.Marker({
			// 	position: new google.maps.LatLng(good.position_y, good.position_x),
			// 	map: map,
			// 	icon: icon
			// });

			/* 3. Click Event that Generate a new overlay which can transistTo state of goods */
			// good.marker.addListener('mouseup', function() {
				// overlay = new GoodsOverlay(map, good, $state, $mdSidenav, closeGoodsOverlay);
			// });

			return good;
		});
	}

	/**
	 * When state go to new olc or zoom, move map to proper position.
	 * (This event will not trigger after reloading page)
	 */
	function urlChanged(event, toState, toParams, fromState, fromParams) {
		if (
			toState.title === 'seek' &&
			!toParams.olc
		) {
			const lat = vm.olcRecord.lat instanceof(Function) 
				? vm.olcRecord.lat()
				: vm.olcRecord.lat;

			const lng = vm.olcRecord.lng instanceof(Function) 
				? vm.olcRecord.lng()
				: vm.olcRecord.lng;

			$state.go($state.current.name, {
				olc : OpenLocationCode.encode(lat, lng),
			}, {
				location : 'replace',
				notify : false,
			});

			map.panTo(vm.olcRecord);
		} else if (toParams.olc) {
			const coord = OpenLocationCode.decode(toParams.olc.replace(' ', '+'));
			map.panTo({
				lat : coord.latitudeCenter,
				lng : coord.longitudeCenter
			});
		}
		if (!isNaN($stateParams.z)) {
			map.setZoom(parseInt($stateParams.z, 10));
		}

		if (
			_.isArray(goods) &&
			goods.length
		) {
			goods.forEach(function(good) {
				good.marker.setMap(null);
			});
		}

		if (toState.name.indexOf('root.withSidenav.seek') === -1) {
			vm.olcRecord = map.getCenter();
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

	function highlightMarker(e, gid) {
		
	}

	function mapMoveTo(e, lat, lng) {
		map.panTo({ lat, lng });
	}

	function openGoodsOverlay(e, gid) {
		overlay = new GoodsOverlay(map, _findGood(gid), $state, $mdSidenav, closeGoodsOverlay);
	}

	function closeGoodsOverlay() {
		if (overlay) {
			overlay.onRemove();
			overlay.setMap(null);
			overlay = null;
		}
	}

	var isDragged = false;
	function onMousedown() {
		isDragged = false;
	}

	function onDragstart() {
		isDragged = true;
	}

	function onMouseup(e) {
		if (!isDragged) {
			onClick(e);
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
					// draggable: true,
					animation: google.maps.Animation.DROP,
					map: map,
				});

				google.maps.event.addListener(vm.marker, 'click', function(e) {
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

/* global google*/

'use strict';

function MarkerOverlay(good, zoom) {
	this.element = null;
	this.good = good;

	this.onAdd = onAdd;
	this.draw = draw.bind(zoom);
	this.onRemove = onRemove;
	// this.setMap(map);
	// this.good.marker.setVisible(false);

	// callback();
}

function onAdd(map, $state, $mdSidenav) {

	var div = document.createElement('div');
	div.style.position           = 'absolute';
	div.style.borderStyle        = 'solid';
	div.style.borderWidth        = '1px';
	div.style.borderColor        = '#388dc1';
	// div.style.backgroundImage    = `url(${this.good.photo_path[0]})`;
	// div.style.backgroundSize     = 'cover';
	// div.style.backgroundPosition = 'center';
	// div.style.backgroundRepeat   = 'no-repeat';
	// div.style.cursor             = 'pointer';
	// div.style.borderRadius       = '15px';
	// google.maps.event.addDomListener(div, 'mousedown', function(e) {
	// 	e.stopPropagation();
	// 	setTimeout(function() {
	// 		$state.go('root.withSidenav.goods', {gid : this.good.gid});
	// 	}.bind(this), 200);

	// 	map.panTo(this.good.marker.getPosition());
	// 	$mdSidenav('left').toggle();
	// }.bind(this));

	this.element = div;
	this.getPanes().overlayMouseTarget.appendChild(div);
}

function draw(zoom) {
	const origin = this.getProjection().fromLatLngToDivPixel(this.good.marker.getPosition());
	const width = 50 * (zoom / 20);

	const el = this.element;
	if (el) {
		el.style.left = `${origin.x - width}px`;
		el.style.top = `${origin.x - width}px`;
		el.style.width = `${width}px`;
		el.style.height = `${width}px`;
	}
}

function onRemove() {
	let el = this.element;

	if (el) {
		el.parentNode.removeChild(el);
		el = null;
	}
}

function toggleHighlight() {
	let el = this.element;
	el.style.backgroundColor = '#f00';
}

function setVisibile(visible) {
	if (this.element) {
		this.element.parentNode.removeChild(this.element);
		this.element = null;
		this.good.marker.setVisible(true);
	}
}

module.exports = MarkerOverlay;

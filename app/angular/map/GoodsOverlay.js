'use strict';

function GoodsOverlay(map, good, $state) {
	this.element = null;
	this.good = good;

	this.onAdd = onAdd.bind(this, map, $state);
	this.draw = draw;
	this.onRemove = onRemove;
	this.setMap(map);
	this.good.marker.setVisible(false);
}

function onAdd(map, $state) {

	var div = document.createElement('div');
	div.style.borderStyle      = 'none';
	div.style.borderWidth      = '0px';
	div.style.position         = 'absolute';
	div.style.backgroundImage  = `url(${this.good.photo_path[0]})`;
	div.style.backgroundSize   = 'contain';
	div.style.backgroundRepeat = 'no-repeat';

	this.element = div;
	google.maps.event.addDomListener(div, 'mouseup', function(e) {
		e.stopPropagation();
		$state.go('root.withSidenav.goods', {gid : this.good.gid});
		map.panTo(this.good.marker.getPosition());
	}.bind(this));

	this.getPanes().overlayMouseTarget.appendChild(div);
}

function draw() {
	const origin = this.getProjection().fromLatLngToDivPixel(this.good.marker.getPosition());

	var el = this.element;
	if (el) {
		el.style.left = origin.x - 75 + 'px';
		el.style.top = origin.y - 75 + 'px';
		el.style.width = 200 + 'px';
		el.style.height = 200 + 'px';
	}
}

function onRemove() {
	if (this.element) {
		this.element.parentNode.removeChild(this.element);
		this.element = null;
		this.good.marker.setVisible(true);
	}
}

module.exports = GoodsOverlay;

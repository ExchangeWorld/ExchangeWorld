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
	div.style.borderStyle = 'none';
	div.style.borderWidth = '0px';
	div.style.position = 'absolute';
	div.style.backgroundColor = 'red';

	this.element = div;
	google.maps.event.addDomListener(div, 'click', function(e) {
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
		el.style.left = origin.x - 150 + 'px';
		el.style.top = origin.y - 150 + 'px';
		el.style.width = 300 + 'px';
		el.style.height = 300 + 'px';
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

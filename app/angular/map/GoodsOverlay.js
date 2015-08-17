'use strict';

function GoodsOverlay(map, good) {
	this.element = null;

	console.log(good);
	this.onAdd = onAdd;
	this.draw = draw;
	this.onRemove = onRemove;
	this.setMap(map);
}

function onAdd() {
	var div = document.createElement('div');
	div.style.borderStyle = 'none';
	div.style.borderWidth = '0px';
	div.style.position = 'absolute';
	div.style.backgroundColor = 'red';

	this.element = div;
	google.maps.event.addDomListener(div, 'click', function(e) {
		e.stopPropagation();
		console.log('OverlayView click');
	}.bind(this));

	// Add the element to the "overlayLayer" pane.
	this.getPanes().overlayMouseTarget.appendChild(div);
}

function draw() {
	var el = this.element;
	if (el) {
		el.style.left = 0 + 'px';
		el.style.top = 0 + 'px';
		el.style.width = 300 + 'px';
		el.style.height = 300 + 'px';
	}
}

function onRemove() {
	// if (this.element) {
	this.element.parentNode.removeChild(this.element);
	this.element = null;
	// this.setMap(null);

	// }
}

module.exports = GoodsOverlay;

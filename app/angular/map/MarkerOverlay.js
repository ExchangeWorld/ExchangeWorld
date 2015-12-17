/* global google*/

'use strict';

function MarkerOverlay(map, category, latlng, zoom) {
	console.log('MarkerOverlay');
	this.element = null;
	// this.good = good;

	this.onAdd = onAdd.bind(this, category);
	this.draw = draw.bind(this, latlng, zoom);
	this.onRemove = onRemove;
	this.setVisible = setVisible;
	this.getPosition = () => latlng;
	this.onResize = onResize;

	this.setMap(map);
}

function onAdd(category) {

	let div = document.createElement('div');
	div.className = 'marker';

	var img = document.createElement('img');
	img.src = `../../images/mapMarker/${category}.svg`;
	div.appendChild(img);

	this.element = div;
	this.getPanes().overlayMouseTarget.appendChild(div);
}

function draw(latlng, zoom) {
	const origin = this.getProjection().fromLatLngToDivPixel(latlng);
	const width = 50;
	
	let el = this.element;
	if (el) {
		el.style.left = `${origin.x - width}px`;
		el.style.top = `${origin.y - width}px`;
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

function setVisible(visible) {
	if (this.element) {
		this.element.parentNode.removeChild(this.element);
		this.element = null;
		this.good.marker.setVisible(true);
	}
}

function onResize(zoom) {

}

module.exports = MarkerOverlay;

/* global google*/

'use strict';

function MarkerOverlay(map, category, viewed,latlng, zoom, onClick) {
	console.log('MarkerOverlay');
	this.element = null;
	// this.good = good;

	this.onAdd = onAdd.bind(this, category, viewed, onClick);
	this.draw = draw.bind(this, latlng, zoom);
	this.onRemove = onRemove;
	this.setVisible = setVisible;
	this.getPosition = () => latlng;
	this.onResize = onResize;

	this.setMap(map);
}

function onAdd(category, viewed, onClick) {

	let div = document.createElement('div');
	div.className = 'marker';
	if (viewed) div.style.backgroundColor = '#9f9f9f';
	div.onclick = () => {
		onClick();
		div.style.backgroundColor = '#9f9f9f';
	};

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
		el.style.left = `${origin.x - width/2}px`;
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
	if (el) {
		el.style.backgroundColor === 'white'
			? el.style.backgroundColor = 'red'
			: el.style.backgroundColor = 'white';
	}
	
}

function setVisible(visible) {
	if (this.element) {
		visible
			? this.element.style.display = 'initial'
			: this.element.style.display = 'none';
	}
}

function onResize(zoom) {

}

module.exports = MarkerOverlay;

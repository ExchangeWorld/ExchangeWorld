'use strict';

function MarkerOverlay(map, category, viewed, latlng, zoom, highColor ,onClick) {
	this.element = null;
	this.viewed = viewed;
	this.special = category === 'Christmas';
	// this.good = good;

	this.onAdd = onAdd.bind(this, category, onClick);
	this.draw = draw.bind(this, latlng, zoom);
	this.onRemove = onRemove;
	this.setVisible = setVisible;
	this.getPosition = () => latlng;
	this.onResize = onResize;
	this.toggleHighlight = toggleHighlight.bind(this, highColor);
	this.setMarkerViewed = setMarkerViewed;

	this.setMap(map);
}

function onAdd(category, onClick) {

	let div = document.createElement('div');
	div.className = 'marker';
	if (this.viewed) div.style.backgroundColor = '#9f9f9f';
	if (this.special) {
		div.style.background = 'radial-gradient(circle, red, yellow, green)';
	}

	div.onclick = () => {
		onClick();
		this.setMarkerViewed();
	};

	var img = document.createElement('img');
	img.src = `../../images/mapMarker/${category}.svg`;
	div.appendChild(img);

	this.element = div;
	this.getPanes().overlayMouseTarget.appendChild(div);
}

function draw(latlng) {
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

function toggleHighlight(highColor) {
	let el = this.element;
	if (el) {
		if (this.special) {
			el.style.background === 'radial-gradient(circle, green, yellow, red)'
				? el.style.background = 'radial-gradient(circle, red, yellow, green)'
				: el.style.background = 'radial-gradient(circle, green, yellow, red)';

		} else {
			el.style.backgroundColor !== highColor
				? el.style.backgroundColor = highColor
				: el.style.backgroundColor = this.viewed ? '#9f9f9f' : 'white';
		}
	}
}

function setMarkerViewed() {
	let el = this.element;
	if (el && !this.special) {
		this.viewed = true;
		el.style.backgroundColor = '#9f9f9f';
	}
}

function setVisible(visible) {
	if (this.element) {
		visible
			? this.element.style.display = 'initial'
			: this.element.style.display = 'none';
	}
}

function onResize() {

}

module.exports = MarkerOverlay;

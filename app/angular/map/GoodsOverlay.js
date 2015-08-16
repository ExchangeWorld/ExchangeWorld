function GoodsOverlay(map, imageUrl, marker) {
	this.element = null;

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

	// Add the element to the "overlayLayer" pane.
	var panes = this.getPanes();
	panes.overlayLayer.appendChild(div);
}

function draw() {
	var div = this.element;
	div.style.left = 0 + 'px';
	div.style.top = 0 + 'px';
	div.style.width = 300 + 'px';
	div.style.height = 300 + 'px';
}

function onRemove() {
	this.element.parentNode.removeChild(this.element);
	this.element = null;
}

module.exports = GoodsOverlay;

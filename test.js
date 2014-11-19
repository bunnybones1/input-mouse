var Mouse = require('./');
var QuickText = require('dom-quick-text');

var labelPos = new QuickText("pos");
var labelPosRel = new QuickText("rel pos");
var labelStatus = new QuickText("status");

var labelPos2 = new QuickText("pos");
var labelPosRel2 = new QuickText("rel pos");
var labelStatus2 = new QuickText("status");



var containerDiv = document.createElement('div');
containerDiv.id = 'threejsContainer';
document.getElementsByTagName('body')[0].appendChild(containerDiv);
console.log(containerDiv);
containerDiv.style.position = 'absolute';
containerDiv.style.left = '25%';
containerDiv.style['background-color'] = '#00ff00';
containerDiv.style.top = '25%';
containerDiv.style.width = '50%';
containerDiv.style.height = '50%';


var containerChildDiv = document.createElement('div');
containerChildDiv.id = 'subContainer';
containerDiv.appendChild(containerChildDiv);
containerChildDiv.style.position = 'absolute';
containerChildDiv.style.left = '25%';
containerChildDiv.style['background-color'] = '#7fff00';
containerChildDiv.style.top = '25%';
containerChildDiv.style.width = '50%';
containerChildDiv.style.height = '50%';


var containerSubChildDiv = document.createElement('div');
containerSubChildDiv.id = 'subSubContainer';
containerChildDiv.appendChild(containerSubChildDiv);
containerSubChildDiv.style.position = 'absolute';
containerSubChildDiv.style.left = '25%';
containerSubChildDiv.style['background-color'] = '#ffff00';
containerSubChildDiv.style.top = '25%';
containerSubChildDiv.style.width = '50%';
containerSubChildDiv.style.height = '50%';


var mouse1 = listenToElement(document, 'document', labelPos, labelPosRel, labelStatus);
var mouse2 = listenToElement(containerDiv, 'containerDiv', labelPos2, labelPosRel2, labelStatus2);

function listenToElement(element, name, labelPos, labelPosRel, labelStatus) {
	var mouse = new Mouse(element);
	// var mouse2 = new Mouse(document);

	// Mouse.onMoveSignal.add(function(x, y) {

	// };
	// Mouse.onMoveRelativeSignal.add(function(x, y) {

	// };
	mouse.onDragSignal.add(function(x, y) {
		labelPos.update(name + ' pos ' + x + ' ' + y);
		labelStatus.update(name + ' drag');
	});
	mouse.onDragRelativeSignal.add(function(x, y) {
		labelPosRel.update(name + ' pos relative ' + x + ' ' + y);
	});
	mouse.onHoverSignal.add(function(x, y) {
		labelPos.update(name + ' pos ' + x + ' ' + y);
		labelStatus.update(name + ' hover');
	});
	mouse.onHoverRelativeSignal.add(function(x, y) {
		labelPosRel.update(name + ' pos relative ' + x + ' ' + y);
	});
	mouse.onDownSignal.add(function(x, y) {
		labelStatus.update(name + ' down');
	});
	mouse.onUpSignal.add(function(x, y) {
		labelStatus.update(name + ' up');
	});
	mouse.onClickSignal.add(function(x, y) {
		labelStatus.update(name + ' click');
	});
	mouse.onOutSignal.add(function(x, y) {
		labelStatus.update(name + ' out');
	});
	return mouse;
};
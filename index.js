var signals = require('signals');
var EventUtil = require('browser-event-adder');

var x, y, lastX, lastY, relX, relY, downX, downY, isDown;

//for convenience, move has 3 modes:
//drag when mouse is down
//hover when mouse is up
//move for both
var onMoveSignal = new signals.Signal();
var onMoveRelativeSignal = new signals.Signal();
var onDragSignal = new signals.Signal();
var onDragRelativeSignal = new signals.Signal();
var onHoverSignal = new signals.Signal();
var onHoverRelativeSignal = new signals.Signal();
var onDownSignal = new signals.Signal();
var onUpSignal = new signals.Signal();
var onClickSignal = new signals.Signal();
var onOutSignal = new signals.Signal();

var start = true;
var clickDistanceThreshPixels = 5;
var clickDistanceThreshPixelsSquared = clickDistanceThreshPixels * clickDistanceThreshPixels;

function testMovedSinceDown() {
	var deltaX = downX - x;
	var deltaY = downY - y;
	return ((deltaX * deltaX + deltaY * deltaY) > clickDistanceThreshPixelsSquared);
}

function onDocumentMouseMove( event ) {
	x = event.clientX;
	y = event.clientY;
	
	onMoveSignal.dispatch(x, y);
	if(isDown) {
		onDragSignal.dispatch(x, y);
	} else {
		onHoverSignal.dispatch(x, y);
	}

	if(start) {
		start = false;
	} else {
		relX = x - lastX;
		relY = y - lastY;
		onMoveRelativeSignal.dispatch(relX, relY);
		if(isDown) {
			onDragRelativeSignal.dispatch(relX, relY);
		} else {
			onHoverRelativeSignal.dispatch(relX, relY);
		}
	}
	lastX = x;
	lastY = y;
};

function onDocumentMouseDown( event ) {
	isDown = true;
	downX = x;
	downY = y;
	onDownSignal.dispatch(x, y);
};

function onDocumentMouseUp( event ) {
	if(!testMovedSinceDown()) {
		onClickSignal.dispatch(x, y);
	}
	isDown = false;
	onUpSignal.dispatch(x, y);
};

function onDocumentMouseOut( event ) {
	isDown = false;
	onOutSignal.dispatch();
};

EventUtil.addEvent(document, 'mousemove', onDocumentMouseMove );
EventUtil.addEvent(document, 'mousedown', onDocumentMouseDown );
EventUtil.addEvent(document, 'mouseup', onDocumentMouseUp );
EventUtil.addEvent(document, 'mouseout', onDocumentMouseOut );

var Mouse = function() {
};

Mouse.prototype = {
	onMoveSignal : onMoveSignal,
	onMoveRelativeSignal : onMoveRelativeSignal,
	onDragSignal : onDragSignal,
	onDragRelativeSignal : onDragRelativeSignal,
	onHoverSignal : onHoverSignal,
	onHoverRelativeSignal : onHoverRelativeSignal,
	onDownSignal : onDownSignal,
	onUpSignal : onUpSignal,
	onClickSignal : onClickSignal,
	onOutSignal : onOutSignal
};

module.exports = new Mouse();
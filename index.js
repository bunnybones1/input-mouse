var signals = require('signals');
var EventUtil = require('browser-event-adder');
var resizeManager = require('input-resize');

var x, y, lastX, lastY, relX, relY, downX, downY, windowHalfX, windowHalfY, isDown;

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
var clickDistanceThreshScreen = 0.1;
var compensateAspectRatio = 1;

function recalculateClickDistanceThresh(width, height) {
	clickDistanceThreshScreen = clickDistanceThreshPixels / width * .5;
	compensateAspectRatio = height / width;
};
resizeManager.onResize.add(recalculateClickDistanceThresh);
recalculateClickDistanceThresh(window.innerWidth, window.innerHeight)


function testMovedSinceDown() {
	var deltaX = downX - x;
	var deltaY = downY - y;
	deltaY /= compensateAspectRatio;
	return ((deltaX * deltaX + deltaY * deltaY) > clickDistanceThreshScreen);
}

function onDocumentMouseMove( event ) {
	x = ( event.clientX - windowHalfX ) / windowHalfX;
	y = ( event.clientY - windowHalfY ) / windowHalfY;
	
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

function onDocumentResize( event ) {
	windowHalfX = window.innerWidth * .5;
	windowHalfY = window.innerHeight * .5;
};

EventUtil.addEvent(document, 'mousemove', onDocumentMouseMove );
EventUtil.addEvent(document, 'mousedown', onDocumentMouseDown );
EventUtil.addEvent(document, 'mouseup', onDocumentMouseUp );
EventUtil.addEvent(document, 'mouseout', onDocumentMouseOut );

var Mouse = function() {
	relX,
	relY,
	EventUtil.addEvent(window, 'resize', onDocumentResize);
	onDocumentResize();
};

Mouse.prototype = {
	onMoveSignal : onMoveSignal,
	onMoveRelativeSignal : onMoveRelativeSignal,
	onDragSignal : onDragSignal,
	onDragRelativeSignal : onDragRelativeSignal,
	onHoverSignal : onHoverSignal,
	onHoverRelativeSignal : onHoverRelativeSignal,
	onDragSignal : onDragSignal,
	onDownSignal : onDownSignal,
	onUpSignal : onUpSignal,
	onClickSignal : onClickSignal,
	onOutSignal : onOutSignal
};

module.exports = new Mouse();
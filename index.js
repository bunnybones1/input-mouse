var signals = require('signals');
var EventUtil = require('browser-event-adder');


var Mouse = function(targetElement, offsetRelativeToTarget) {

	this.targetElement = targetElement;
	this.isTargetDocument = targetElement === document;
	this.offsetRelativeToTarget = offsetRelativeToTarget === undefined ? true : offsetRelativeToTarget;	//default true
	this.x = 0;
	this.y = 0;
	this.lastX = 0;
	this.lastY = 0;
	this.relX = 0;
	this.relY = 0;
	this.downX = 0;
	this.downY = 0;
	this.isDown = false;

	//for convenience, move has 3 modes:
	//drag when mouse is down
	//hover when mouse is up
	//move for both
	this.onMoveSignal = new signals.Signal();
	this.onMoveRelativeSignal = new signals.Signal();
	this.onDragSignal = new signals.Signal();
	this.onDragRelativeSignal = new signals.Signal();
	this.onHoverSignal = new signals.Signal();
	this.onHoverRelativeSignal = new signals.Signal();
	this.onDownSignal = new signals.Signal();
	this.onUpSignal = new signals.Signal();
	this.onClickSignal = new signals.Signal();
	this.onOutSignal = new signals.Signal();

	this.start = true;
	this.clickDistanceThreshPixels = 5;
	this.clickDistanceThreshPixelsSquared = this.clickDistanceThreshPixels * this.clickDistanceThreshPixels;

	this.onMouseMove = this.onMouseMove.bind(this);
	this.onMouseDown = this.onMouseDown.bind(this);
	this.onMouseUp = this.onMouseUp.bind(this);
	this.onMouseOut = this.onMouseOut.bind(this);

	EventUtil.addEvent(targetElement, 'mousemove', this.onMouseMove );
	EventUtil.addEvent(targetElement, 'mousedown', this.onMouseDown );
	EventUtil.addEvent(targetElement, 'mouseup', this.onMouseUp );
	EventUtil.addEvent(targetElement, 'mouseout', this.onMouseOut );
};

Mouse.prototype = {
	testMovedSinceDown: function() {
		var deltaX = this.downX - this.x;
		var deltaY = this.downY - this.y;
		return ((deltaX * deltaX + deltaY * deltaY) > this.clickDistanceThreshPixelsSquared);
	},

	onMouseMove: function( event ) {
		this.computeCustomOffset(event);
		this.x = event.offsetX2;
		this.y = event.offsetY2;
		
		this.onMoveSignal.dispatch(this.x, this.y);
		if(this.isDown) {
			this.onDragSignal.dispatch(this.x, this.y);
		} else {
			this.onHoverSignal.dispatch(this.x, this.y);
		}

		if(this.start) {
			this.start = false;
		} else {
			this.relX = this.x - this.lastX;
			this.relY = this.y - this.lastY;
			this.onMoveRelativeSignal.dispatch(this.relX, this.relY);
			if(this.isDown) {
				this.onDragRelativeSignal.dispatch(this.relX, this.relY);
			} else {
				this.onHoverRelativeSignal.dispatch(this.relX, this.relY);
			}
		}
		this.lastX = this.x;
		this.lastY = this.y;
	},

	onMouseDown: function( event ) {
		this.isDown = true;
		this.downX = this.x;
		this.downY = this.y;
		this.onDownSignal.dispatch(this.x, this.y);
	},

	onMouseUp: function( event ) {
		if(!this.testMovedSinceDown()) {
			this.onClickSignal.dispatch(this.x, this.y);
		}
		this.isDown = false;
		this.onUpSignal.dispatch(this.x, this.y);
	},

	onMouseOut: function( event ) {
		this.isDown = false;
		this.onOutSignal.dispatch();
	},

	computeCustomOffset: function(event) {
		if(this.offsetRelativeToTarget) {
			if(this.isTargetDocument) {
				var target = event.target;
				var offsetLeft = target.offsetLeft;
				var offsetTop = target.offsetTop;
				while(target.offsetParent) {
					target = target.offsetParent;
					offsetLeft += target.offsetLeft;
					offsetTop += target.offsetTop;
				}
				event.offsetX2 = event.offsetX + offsetLeft;
				event.offsetY2 = event.offsetY + offsetTop;
			} else {
				var target = event.target;
				var offsetLeft = 0;
				var offsetTop = 0;
				while(target !== this.targetElement) {
					offsetLeft += target.offsetLeft;
					offsetTop += target.offsetTop;
					target = target.offsetParent;
				}
				event.offsetX2 = event.offsetX + offsetLeft;
				event.offsetY2 = event.offsetY + offsetTop;
			}
		} else {
			event.offsetX2 = event.clientX;
			event.offsetY2 = event.clientY;
		}
	}

};

module.exports = Mouse;
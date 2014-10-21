var Mouse = require('./');
var QuickText = require('dom-quick-text');

var labelPos = new QuickText("pos");
var labelPosRel = new QuickText("rel pos");
var labelStatus = new QuickText("status");

// Mouse.onMoveSignal.add(function(x, y) {

// };
// Mouse.onMoveRelativeSignal.add(function(x, y) {

// };
Mouse.onDragSignal.add(function(x, y) {
	labelPos.update('pos ' + x + ' ' + y);
	labelStatus.update('drag');
});
Mouse.onDragRelativeSignal.add(function(x, y) {
	labelPosRel.update('pos relative ' + x + ' ' + y);
});
Mouse.onHoverSignal.add(function(x, y) {
	labelPos.update('pos ' + x + ' ' + y);
	labelStatus.update('hover');
});
Mouse.onHoverRelativeSignal.add(function(x, y) {
	labelPosRel.update('pos relative ' + x + ' ' + y);
});
Mouse.onDownSignal.add(function(x, y) {
	labelStatus.update('down');
});
Mouse.onUpSignal.add(function(x, y) {
	labelStatus.update('up');
});
Mouse.onClickSignal.add(function(x, y) {
	labelStatus.update('click');
});
Mouse.onOutSignal.add(function(x, y) {
	labelStatus.update('out');
});
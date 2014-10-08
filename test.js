var Mouse = require('./');
var labelPos = document.createTextNode("pos");
var labelPosDiv = document.createElement("div");
labelPosDiv.appendChild(labelPos);
var labelPosRel = document.createTextNode("rel pos");
var labelPosRelDiv = document.createElement("div");
labelPosRelDiv.appendChild(labelPosRel);
var labelStatus = document.createTextNode("status");
var labelStatusDiv = document.createElement("div");
labelStatusDiv.appendChild(labelStatus);
document.body.appendChild(labelPosDiv);
document.body.appendChild(labelPosRelDiv);
document.body.appendChild(labelStatusDiv);

function status(what) {
	console.log(what);
	labelStatus.replaceWholeText(what);

}
// Mouse.onMoveSignal.add(function(x, y) {

// };
// Mouse.onMoveRelativeSignal.add(function(x, y) {

// };
Mouse.onDragSignal.add(function(x, y) {
	labelPos.replaceWholeText('pos ' + x + ' ' + y);
	status('drag');
});
Mouse.onDragRelativeSignal.add(function(x, y) {
	labelPosRel.replaceWholeText('pos relative ' + x + ' ' + y);
});
Mouse.onHoverSignal.add(function(x, y) {
	labelPos.replaceWholeText('pos ' + x + ' ' + y);
	status('hover');
});
Mouse.onHoverRelativeSignal.add(function(x, y) {
	labelPosRel.replaceWholeText('pos relative ' + x + ' ' + y);
});
Mouse.onDownSignal.add(function(x, y) {
	status('down');
});
Mouse.onUpSignal.add(function(x, y) {
	status('up');
});
Mouse.onClickSignal.add(function(x, y) {
	status('click');
});
Mouse.onOutSignal.add(function(x, y) {
	status('out');
});
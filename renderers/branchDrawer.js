var draw = function(branch, context) {
    ctx.beginPath();
    var o = branch.getOriginPoint();
    ctx.moveTo(o.x, o.y);
    var e = branch.getEndingPoint();
    ctx.lineTo(e.x, e.y);
    ctx.stroke();
};

module.exports = {
    draw: draw
};
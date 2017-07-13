const Point = require('./point');

function Branch(origin) {
    this.origin = origin;
    this.length = 3;
    this.direction = 0.5;

    this.calculateEndingPoint = function() {
        return new Point(
            this.origin.x + -1 * this.length * Math.cos(Math.PI * this.direction),
            this.origin.y + -1 * this.length * Math.sin(Math.PI * this.direction));
    };
}

Branch.prototype.getOriginPoint = function() {
    return this.origin;
};

Branch.prototype.getEndingPoint = function() {
    return this.calculateEndingPoint();
};

module.exports = Branch;
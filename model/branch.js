const Point = require('./point');

const SUB_BRANCH_MINIMAL_LENGTH = 50;
const SUB_BRANCH_REF_POSITION = 0.7;
const SUB_BRANCH_REF_DIR = 0.1;
const GROWTH_SPEED = 0.5;

function Branch(origin, angle) {
    this.origin = origin;
    this.length = 1;
    this.angle = angle || 0.5;
    this.subBranches = {};

    function transformX(x, l, a) {
        return x + -1 * l * Math.cos(Math.PI * a);
    }

    function transformY(y, l, a) {
        return y + -1 * l * Math.sin(Math.PI * a);
    }

    this.calculateEndingPoint = function() {
        return new Point(
            transformX(this.origin.x, this.length, this.angle),
            transformY(this.origin.y, this.length, this.angle));
    };

    this.incrementLength = function() {
        this.length += GROWTH_SPEED;
    };

    this.propagateGrowth = function() {
        if (this.subBranches.right) {
            this.subBranches.right.grow();
        }
        if (this.subBranches.left) {
            this.subBranches.left.grow();
        }
    };

    this.createSubBranches = function() {
        if (this.length === SUB_BRANCH_MINIMAL_LENGTH) {
            this.subBranches = {
                right: new Branch(new Point(
                        transformX(this.origin.x, this.length * SUB_BRANCH_REF_POSITION, this.angle),
                        transformY(this.origin.y, this.length * SUB_BRANCH_REF_POSITION, this.angle)),
                    this.angle - SUB_BRANCH_REF_DIR),
                left: new Branch(new Point(
                        transformX(this.origin.x, this.length * SUB_BRANCH_REF_POSITION, this.angle),
                        transformY(this.origin.y, this.length * SUB_BRANCH_REF_POSITION, this.angle)),
                    this.angle + SUB_BRANCH_REF_DIR),
            };
        }
    };
}

Branch.prototype.getOriginPoint = function() {
    return this.origin;
};

Branch.prototype.getEndingPoint = function() {
    return this.calculateEndingPoint();
};

Branch.prototype.grow = function() {
    this.incrementLength();
    this.propagateGrowth();
    this.createSubBranches();
};

module.exports = Branch;
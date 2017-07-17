const Point = require('./point');
const random = require('../utils/random');

const SUB_BRANCH_MINIMAL_LENGTH = 30;
const SUB_BRANCH_REF_POSITION_MIN = 0.5;
const SUB_BRANCH_REF_POSITION_MAX = 1.0;
const SUB_BRANCH_REF_ANGLE_MIN = 0.05;
const SUB_BRANCH_REF_ANGLE_MAX = 0.15;
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
        if (this.length <= SUB_BRANCH_MINIMAL_LENGTH) {
            this.length += GROWTH_SPEED;
        }
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
            var rightPos = random(SUB_BRANCH_REF_POSITION_MIN, SUB_BRANCH_REF_POSITION_MAX);
            var leftPos = random(SUB_BRANCH_REF_POSITION_MIN, SUB_BRANCH_REF_POSITION_MAX);
            var rightAngle = random(SUB_BRANCH_REF_ANGLE_MIN, SUB_BRANCH_REF_ANGLE_MAX);
            var leftAngle = random(SUB_BRANCH_REF_ANGLE_MIN, SUB_BRANCH_REF_ANGLE_MAX);
            this.subBranches = {
                right: new Branch(new Point(
                        transformX(this.origin.x, this.length * rightPos, this.angle),
                        transformY(this.origin.y, this.length * rightPos, this.angle)),
                    this.angle - rightAngle),
                left: new Branch(new Point(
                        transformX(this.origin.x, this.length * leftPos, this.angle),
                        transformY(this.origin.y, this.length * leftPos, this.angle)),
                    this.angle + leftAngle),
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
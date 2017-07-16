const Point = require('./point');

const SUB_BRANCH_MINIMAL_LENGTH = 50;
const SUB_BRANCH_REF_POSITION = 0.7;
const SUB_BRANCH_REF_DIR = 0.1;

function Branch(origin, direction) {
    this.origin = origin;
    this.length = 1;
    this.direction = direction || 0.5;
    this.subBranches = {};

    this.calculateEndingPoint = function() {
        return new Point(
            this.origin.x + -1 * this.length * Math.cos(Math.PI * this.direction),
            this.origin.y + -1 * this.length * Math.sin(Math.PI * this.direction));
    };

    this.incrementLength = function() {
        this.length++;
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
                        this.origin.x + -1 * this.length * SUB_BRANCH_REF_POSITION * Math.cos(Math.PI * (this.direction)),
                        this.origin.y + -1 * this.length * SUB_BRANCH_REF_POSITION * Math.sin(Math.PI * (this.direction))),
                    this.direction - SUB_BRANCH_REF_DIR),
                left: new Branch(new Point(
                        this.origin.x + -1 * this.length * SUB_BRANCH_REF_POSITION * Math.cos(Math.PI * (this.direction)),
                        this.origin.y + -1 * this.length * SUB_BRANCH_REF_POSITION * Math.sin(Math.PI * (this.direction))),
                    this.direction + SUB_BRANCH_REF_DIR),
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
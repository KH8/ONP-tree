const electron = require('electron');
var win = {
    width: 760,
    height: 560
};

var canvas = document.getElementById('canvas');
canvas.width = win.width;
canvas.height = win.height;
var ctx = canvas.getContext("2d");

const Point = require('./model/point');
var origin = new Point(380, 530);

const Branch = require('./model/branch');
var b1 = new Branch(origin);

const drawer = require('./renderers/branchDrawer');

function draw(branch) {
    drawer.draw(branch, ctx);
    if (branch.subBranches.right) {
        draw(branch.subBranches.right);
    }
    if (branch.subBranches.left) {
        draw(branch.subBranches.left);
    }
}

setInterval(function() {
    b1.grow();
    draw(b1);
}, 50);
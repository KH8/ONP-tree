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
b1.length = 100;

const drawer = require('./renderers/branchDrawer');
drawer.draw(b1, ctx);
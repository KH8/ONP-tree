const electron = require('electron');
var screenElectron = electron.screen;
var mainScreen = screenElectron.getPrimaryDisplay();

var canvas = document.getElementById('canvas');
canvas.width = mainScreen.size.width;
canvas.height = mainScreen.size.height;
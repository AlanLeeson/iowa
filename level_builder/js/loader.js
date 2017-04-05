"use strict";

var app = app || {};

window.onload = function(){

	/*** Load any images that will be used in the game ***/
	resources.load([
		"assets/tile1.png",
		"assets/tile2.png"
	]);

	//start the game.
	resources.onReady(app.Main.init());

};

"use strict";

var app = app || {};

window.onload = function(){

	/*** Load any images that will be used in the game ***/
	resources.load([
	]);

	//start the game.
	resources.onReady(app.Main.init());

};

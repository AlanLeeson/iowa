"use strict"

var app = app || {};

app.GameObject = function () {

	var GameObject = function() {
		this.world = new app.World({});
		this.states = {"PLAY" : 0, "PAUSE" : 1, "MENU" : 2};

		this.controller = null;
		this.controllers = [];
	};

	var p = GameObject.prototype;

	p.getCurrentState = function() {
		return this.world.currentState;
	};

	p.setCurrentState = function(state) {
		this.world.currentState = this.states[state] != null ? this.states[state] : this.world.currentState;
	};

	p.getController = function() {
		return this.controller;
	}

	p.setController = function(controller) {
		//this.controller = controller;
		//this.controller.init();
		controller.init();
		this.controllers.push(controller);
	}

	p.setWorld = function(world) {
		this.world = world;
	};

	p.setMenu = function(menu) {
		this.menu = menu;
	};

	p.update = function(dt) {
		for (var controller in this.controllers)
		{
			this.controllers[controller].update(this);
		}
		//if(this.controller !== null){
			//this.controller.update(this);
		//}

		if(this.states.PLAY === this.world.currentState){
			this.world.update(dt);
			this.world.doUpdateFunction();
		}
		if(this.states.PAUSE === this.world.currentState){

		}
	};

	p.render = function(ctx) {
		if(this.states.PLAY === this.world.currentState){
			this.world.render(ctx);
		}
		else if(this.states.PAUSE === this.world.currentState){
			this.world.render(ctx);
			app.draw.text(ctx,"Currently Paused",100,100,20,'rgba(50,50,200,1)');
		}
		else if(this.states.MENU === this.world.currentState){
		}
	};


	return GameObject;

}();

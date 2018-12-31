"use strict"

class GameObject {

	constructor() {
		this.world = new app.World({});
		this.states = {"PLAY" : 0, "PAUSE" : 1, "MENU" : 2};
		this.menu = new Menu();

		this.controller = null;
	};


	getCurrentState() {
		return this.world.currentState;
	};

	setCurrentState(state) {
		this.world.currentState = this.states[state] != null ? this.states[state] : this.world.currentState;
	};

	getController() {
		return this.controller;
	}

	setController(controller) {
		this.controller = controller;
		this.controller.init();
	}

	setWorld(world) {
		this.world = world;
	};

	setMenu(menu) {
		this.menu = menu;
	};

	update(dt) {
		if(this.controller !== null){
			this.controller.update(this);
		}

		if(this.states.PLAY === this.world.currentState){
			this.world.update(dt);
			this.world.doUpdateFunction();
		}
		if(this.states.PAUSE === this.world.currentState){

		}
	};

	render(ctx) {
		if(this.states.PLAY === this.world.currentState){
			this.world.render(ctx);
		}
		else if(this.states.PAUSE === this.world.currentState){
			this.world.render(ctx);
			app.draw.text(ctx,"Currently Paused",100,100,20,'rgba(50,50,200,1)');
		}
		else if(this.states.MENU === this.world.currentState){
			this.menu.render(ctx);
		}
	};
	
}

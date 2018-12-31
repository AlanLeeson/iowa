"use strict";

class Entity {
	constructor(posX, posY, vertices, colour, mass, type, friction = 1) {
		this.type = type;
		this.colour = colour;

		this.location = vec2.fromValues(posX,posY);
		this.velocity = vec2.create();
		this.acceleration = vec2.create();
		this.movementSpeed = mass;
		this.maxVelocity = vec2.fromValues(5,5);
		this.sprite = null;
		this.controller = null;

		//array of vec2 points
		this.vertices = vertices;

		this.collisionResolution = null;
		this.customLogic = null;

		this.removeCondition = null;
		this.listeners = [];
		this.friction = friction;
	}
	
	updateEntityEvent() {
		for(var i = 0; i < this.listeners.length; i++){
			this.listeners[i].doUpdateEntityEvent(this);
		}
	}
	
	addUpdateListener(listener) {
		this.listeners.push(listener);
	}

	setSprite(sprite) {
		this.sprite = sprite;
	}

	getLocation(){
		return this.location;
	}

	getPolygon(){
		var polygon = [];

		for(var i = 0; i < this.vertices.length; i++)
		{
			polygon.push(
				vec2.fromValues(
					this.vertices[i][0] + this.location[0],
					this.vertices[i][1] + this.location[1]));
		}
		return polygon;
	}
	
	getCenter(){
		var x_sum = 0;
		var y_sum = 0;

		var polygon = this.getPolygon();
		for(var i = 0; i < this.vertices.length; i++)
		{
			x_sum += polygon[i][0];
			y_sum += polygon[i][1];
		}

		return vec2.fromValues(x_sum / this.vertices.length,y_sum / this.vertices.length);
	}

	setController(controller) {
		this.controller = controller;
		this.controller.init();
	};

	setRemoveCondition(removeCondition) {
		this.updateEntityEvent();

		this.removeCondition = removeCondition;
	};

	setCollisionResolution(collisionResolution) {
		this.updateEntityEvent();

		this.collisionResolution = collisionResolution;
	};

	setCustomLogic(customLogic) {
		this.customLogic = customLogic;
	}

	canRemove() {
		if (this.removeCondition !== null) {
			return this.removeCondition();
		} else
			return false;
	};

	update(dt, entities) {
		if(this.controller !== null){
			this.controller.update(this);
		}
		if(this.sprite !== null){
			this.sprite.update(dt);
		}

		if (this.customLogic !== null) {
			this.customLogic(this);
		}

		switch(this.type) {
			case 'moveable' :
				var old_location = vec2.clone(this.location);
				updateLocation(this.velocity,this.acceleration,this.location,this.friction);
				this.acceleration = vec2.create();

				for(var i = 0; i < entities.length; i++)
				{
					if(entities[i] !== this)
					{
						if(app.collision.polygonCollision(this.getPolygon(), entities[i].getPolygon())){
							this.location = old_location;
							if (entities[i].collisionResolution !== null) {
								entities[i].collisionResolution(this);
							}
						}
					}
				}

				break;
			case 'stationary' :
				break;
		}
	};
	
	render(ctx) {
		if(this.sprite != null){this.sprite.render(ctx, this.location); }
		app.draw.polygon(ctx,this.location[0],this.location[1],this.vertices,this.colour);
	};

	applyWorldForces(wolrdForces) {
		for(var i = 0; i < wolrdForces.length; i ++){
			applyForce(wolrdForces[i], this.acceleration);
		}
	};

	applyForce(force) {
		applyForce(force, this.acceleration);
	};

} 

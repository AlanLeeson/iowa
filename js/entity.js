"use strict";

var app = app || {};

app.Entity = function(){

	var Entity = function(x,y,vertices,col,mass,type){
		this.type = type;
		this.col = col;

		this.location = vec2.fromValues(x,y);
		this.velocity = vec2.create();
		this.acceleration = vec2.create();
		this.movementSpeed = mass;
		this.maxVelocity = vec2.fromValues(5,5);
		this.sprite = null;
		this.controller = null;

		//array of vec2 points
		this.vertices = vertices;

		this.collisionResolution = null;

		this.removeCondition = null;
		this.listeners = [];
	};

	var p = Entity.prototype;

	p.updateEntityEvent = function(){
		for(var i = 0; i < this.listeners.length; i++){
			this.listeners[i].doUpdateEntityEvent(this);
		}
	}

	p.addUpdateListener = function(listener){
		this.listeners.push(listener);
	}

	p.setSprite = function(sprite){
		this.sprite = sprite;
	}

	p.getLocation = function(){
		return this.location;
	}

	p.getPolygon = function(){
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

	p.setController = function(controller){
		this.controller = controller;
		this.controller.init();
	};

	p.setRemoveCondition = function(removeCondition){
		this.updateEntityEvent();

		this.removeCondition = removeCondition;
	};

	p.setCollisionResolution = function(collisionResolution){
		this.updateEntityEvent();

		this.collisionResolution = collisionResolution;
	};

	p.canRemove = function(){
		if (this.removeCondition !== null) {
			return this.removeCondition();
		} else
			return false;
	};

	p.update = function(dt, entities){
		if(this.controller !== null){
			this.controller.update(this);
		}
		if(this.sprite !== null){
			this.sprite.update(dt);
		}

		switch(this.type) {
			case 'moveable' :

				var old_location = vec2.clone(this.location);
				updateLocation(this.velocity,this.acceleration,this.location);
				this.acceleration = vec2.create();

				for(var i = 0; i < entities.length; i++)
				{
					if(entities[i] !== this)
					{
						if(app.collision.polygonCollision(this.getPolygon(), entities[i].getPolygon())){
							this.location = old_location;

							entities[i].collisionResolution();
						}
					}
				}

				break;
			case 'stationary' :
				break;
		}
	};

	p.render = function(ctx){
		if(this.sprite != null){this.sprite.render(ctx, this.location); }
		app.draw.polygon(ctx,this.location[0],this.location[1],this.vertices,this.col);
	};

	p.applyWorldForces = function(wolrdForces){
		for(var i = 0; i < wolrdForces.length; i ++){
			applyForce(wolrdForces[i], this.acceleration);
		}
	};

	p.applyForce = function(force){
		applyForce(force, this.acceleration);
	};

	return Entity;

}();

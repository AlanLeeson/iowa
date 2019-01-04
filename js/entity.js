"use strict";

class Entity {
	constructor(posX, posY, vertices, colour) {
		this.colour = colour;

		this.location = vec2.fromValues(posX,posY);
		this.sprite = null;
		this.controller = null;
		this.acceleration = vec2.create();

		//array of vec2 points
		this.vertices = vertices;

		this.collisionResolution = null;
		this.customLogic = null;

		this.removeCondition = null;
		this.listeners = [];
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

	getPolygon(x = this.location[0], y = this.location[1]){
		var polygon = [];

		for(var i = 0; i < this.vertices.length; i++)
		{
			polygon.push(
				vec2.fromValues(
					this.vertices[i][0] + x,
					this.vertices[i][1] + y));
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

class MoveableEntity extends Entity {
	constructor(posX, posY, vertices, colour, mass = 1, friction = 1) {
		super(posX, posY, vertices, colour);
		this.velocity = vec2.create();
		this.movementSpeed = mass;
		this.maxVelocity = vec2.fromValues(5,5);
		this.friction = friction;
	}
	
	update(dt, entities) {
		super.update(dt, entities);
		var old_location = vec2.clone(this.location);
		var location_x = updateLocationByVector(this.velocity[0],this.acceleration[0],this.location[0],this.friction);
        
        var location_y = updateLocationByVector(this.velocity[1],this.acceleration[1],this.location[1],this.friction);      
        //reset accelerations
		this.acceleration = vec2.create();

        var poly_x = this.getPolygon(location_x, this.location[1]);
        var poly_y = this.getPolygon(this.location[0], location_y);
        
        var coll_x = false;
        var coll_y = false;
		for(var i = 0; i < entities.length; i++)
		{
			if(entities[i] !== this)
			{
				if(app.collision.polygonCollision(poly_x, entities[i].getPolygon())){
                    coll_x = true;
					if (entities[i].collisionResolution !== null) {
						entities[i].collisionResolution(this);
					}
				}
                if(app.collision.polygonCollision(poly_y, entities[i].getPolygon())){
                    coll_y = true;
					if (entities[i].collisionResolution !== null) {
						entities[i].collisionResolution(this);
					}
                }
			}
		}
        if(!coll_x){
            this.location[0] = location_x;
        }
        if(!coll_y){
            this.location[1] = location_y;
        }
	}
}

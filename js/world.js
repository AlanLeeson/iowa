"use strict";

var app = app || {};

app.World = function(){

	var World = function(forces){
		this.type = "world";

		this.forces = forces;

    this.entities = [];

		this.updateFunction = null;
		this.backgroundSprite = undefined;
		this.campera = null;
		this.currentState = 2;
		this.room = null;
	};

	var p = World.prototype;

    p.getGravity = function(){
        return this.gravity;
    };

    p.getForces = function(){
    	return this.forces;
    };

    p.addForce = function(force){
    	this.forces.push(force);
    };

		p.setUpdateFunction = function(updateFunction){
			this.updateFunction = updateFunction;
		};

		p.setBackgroundSprite = function(sprite){
			this.backgroundSprite = sprite;
		};

		p.setCamera = function(camera){
			this.camera = camera;
		};

		p.setRoom = function(room){
			this.room = room;
		};

		p.doUpdateFunction = function(){
			if (this.updateFunction !== null) {
				return this.updateFunction();
			}
		};

    p.addEntity = function(entity){
				entity.addUpdateListener(this);
        this.entities.push(entity);
    };

		p.updateEntityHandler = function(e) {
			console.log(e.entity);
		};

    p.getEntity = function(i){
        return this.entities[i];
    };

    p.numEntities = function(){
        return this.entities.length;
    };

		p.doUpdateEntityEvent = function(entity){
				console.log(entity);
		};

    p.update = function(dt){
    	for(var i = this.entities.length - 1; i >= 0; i--)
			{
				var entity = this.entities[i];

				entity.applyWorldForces(this.forces);

				if(entity.canRemove()){
					this.entities.splice(i, 1);
					continue;
				}

				entity.update(dt, this.entities);
			}
    };

    p.render = function(ctx){
			this.camera.begin();
			if (this.room !== null) {
				this.room.map.render(ctx);
			}
			for(var i = 0; i < this.entities.length; i++)
			{
				this.entities[i].render(ctx);
			}
			this.camera.end();
    };

	return World;

}();

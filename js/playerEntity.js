"use strict";

var app = app || {};

app.PlayerEntity = function(){

  var PlayerEntity = function(x,y,radius,col,mass,type){
    app.Entity.call(this,x,y,radius,col,mass,type);

    this.applyCollisions = false;
    this.health = 1000;
	this.terminalRightVel = 1.3;
	this.terminalLeftVel = -1.3;
	this.terminalUpVel = -1.3;
	this.terminalDownVel = 1.3;
  };

  PlayerEntity.prototype = Object.create(app.Entity.prototype);
  PlayerEntity.prototype.construction = PlayerEntity;
  var p = PlayerEntity.prototype;

  p.moveLeft = function(force){
  	if(this.velocity[0] > 0) {this.velocity = vec2.fromValues(0, this.velocity[1]);}
	if(this.velocity[0] < this.terminalLeftVel){
		this.velocity = vec2.fromValues(this.terminalLeftVel, this.velocity[1]);
	} else {
		this.applyWorldForces(force);
	}
  };

  p.moveRight = function(force){
  	if(this.velocity[0] < 0) {this.velocity = vec2.fromValues(0, this.velocity[1]);}
	if(this.velocity[0] > this.terminalRightVel){
		this.velocity = vec2.fromValues(this.terminalRightVel, this.velocity[1]);
	} else {
		this.applyWorldForces(force);
	}
  }

  p.stopRightLeft = function(){
  	this.velocity[0] = 0;
  }

  p.moveDown = function(force){
    if(this.velocity[1] < 0) {this.velocity = vec2.fromValues(this.velocity[0], 0);}
	if(this.velocity[1] > this.terminalDownVel){
		this.velocity = vec2.fromValues(this.velocity[0], this.terminalDownVel);
	} else {
		this.applyWorldForces(force);
	}
  }

  p.moveUp = function(force){
    if(this.velocity[1] > 0) {this.velocity = vec2.fromValues(this.velocity[0], 0);}
  	if(this.velocity[1] < this.terminalUpVel){
  		this.velocity = vec2.fromValues(this.velocity[0], this.terminalUpVel);
  	} else {
  		this.applyWorldForces(force);
  	}
  }

  p.stopUpDown = function(){
    this.velocity[1] = 0;
  }

  return PlayerEntity;
}();

"use strict";

var app = app || {};

app.PlayerEntity = function(){

  var PlayerEntity = function(x,y,vertices,col,mass,type){
    app.Entity.call(this,x,y,vertices,col,mass,type);

    this.applyCollisions = false;
	this.terminalRightVel = 2.0;
	this.terminalLeftVel = -2.0;
	this.terminalUpVel = -2.0;
	this.terminalDownVel = 2.0;
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

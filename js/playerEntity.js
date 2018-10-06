"use strict";

var app = app || {};

app.PlayerEntity = function(){

  var PlayerEntity = function(x,y,vertices,col,mass,type){
    app.Entity.call(this,x,y,vertices,col,mass,type);

    this.applyCollisions = false;
	  this.terminalRightVel = 3;
	  this.terminalLeftVel = -3;
	  this.terminalUpVel = -3;
	  this.terminalDownVel = 3;

    this.sprint = false;
    this.sneak = false;
  };

  PlayerEntity.prototype = Object.create(app.Entity.prototype);
  PlayerEntity.prototype.construction = PlayerEntity;
  var p = PlayerEntity.prototype;

  p.moveLeft = function(force){
      var termVel  = this.getTerminalVel(this.terminalLeftVel);
  	if(this.velocity[0] > 0) {this.velocity = vec2.fromValues(0, this.velocity[1]);}
	if(this.velocity[0] < termVel){
		this.velocity = vec2.fromValues(termVel, this.velocity[1]);
	} else {
		this.applyWorldForces(force);
	}
  };

  p.moveRight = function(force){
      var termVel  = this.getTerminalVel(this.terminalRightVel);
  	if(this.velocity[0] < 0) {this.velocity = vec2.fromValues(0, this.velocity[1]);}
	if(this.velocity[0] > termVel){
		this.velocity = vec2.fromValues(termVel, this.velocity[1]);
	} else {
		this.applyWorldForces(force);
	}
  }

  p.stopRightLeft = function(){
  	this.velocity[0] = 0;
  }

  p.moveDown = function(force){
      var termVel  = this.getTerminalVel(this.terminalDownVel);
    if(this.velocity[1] < 0) {this.velocity = vec2.fromValues(this.velocity[0], 0);}
	if(this.velocity[1] > termVel){
		this.velocity = vec2.fromValues(this.velocity[0], termVel);
	} else {
		this.applyWorldForces(force);
	}
  }

  p.moveUp = function(force){
    var termVel  = this.getTerminalVel(this.terminalUpVel);
    if(this.velocity[1] > 0) {this.velocity = vec2.fromValues(this.velocity[0], 0);}
  	if(this.velocity[1] < termVel){
  		this.velocity = vec2.fromValues(this.velocity[0], termVel);
  	} else {
  		this.applyWorldForces(force);
  	}
  }

  p.stopUpDown = function(){
    this.velocity[1] = 0;
  }

  p.startSprint = function(){
    this.sprint = true;
  }

  p.stopSprint = function(){
    this.sprint = false;
  }

  p.startSneak = function(){
    this.sprint = false;
    this.sneak = true;
  }

  p.stopSneak = function(){
    this.sneak = false;
  }

  p.getTerminalVel = function(termVal) {
      if(this.sprint)
      {
        termVal = termVal * 2;
      }
      if(this.sneak)
      {
        termVal = termVal / 2;
      }
      return termVal;
  }

  return PlayerEntity;
}();

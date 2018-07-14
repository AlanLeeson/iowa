"use strict";

var app = app || {};

app.PlayerEntity = function(){

  var PlayerEntity = function(x,y,vertices,col,mass,type){
    app.Entity.call(this,x,y,vertices,col,mass,type);

    this.applyCollisions = false;
	  this.terminalRightVel = 2.5;
	  this.terminalLeftVel = -2.5;
	  this.terminalUpVel = -2.5;
	  this.terminalDownVel = 2.5;

    this.sprint = false;
  };

  PlayerEntity.prototype = Object.create(app.Entity.prototype);
  PlayerEntity.prototype.construction = PlayerEntity;
  var p = PlayerEntity.prototype;

  p.moveLeft = function(force){
  	if(this.velocity[0] > 0) {this.velocity = vec2.fromValues(0, this.velocity[1]);}
	if(this.velocity[0] < this.getTerminalLeftVel()){
		this.velocity = vec2.fromValues(this.getTerminalLeftVel(), this.velocity[1]);
	} else {
		this.applyWorldForces(force);
	}
  };

  p.moveRight = function(force){
  	if(this.velocity[0] < 0) {this.velocity = vec2.fromValues(0, this.velocity[1]);}
	if(this.velocity[0] > this.getTerminalRightVel()){
		this.velocity = vec2.fromValues(this.getTerminalRightVel(), this.velocity[1]);
	} else {
		this.applyWorldForces(force);
	}
  }

  p.stopRightLeft = function(){
  	this.velocity[0] = 0;
  }

  p.moveDown = function(force){
    if(this.velocity[1] < 0) {this.velocity = vec2.fromValues(this.velocity[0], 0);}
	if(this.velocity[1] > this.getTerminalDownVel()){
		this.velocity = vec2.fromValues(this.velocity[0], this.getTerminalDownVel());
	} else {
		this.applyWorldForces(force);
	}
  }

  p.moveUp = function(force){
    if(this.velocity[1] > 0) {this.velocity = vec2.fromValues(this.velocity[0], 0);}
  	if(this.velocity[1] < this.getTerminalUpVel()){
  		this.velocity = vec2.fromValues(this.velocity[0], this.getTerminalUpVel());
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

  p.getTerminalRightVel = function(){
    var termVal = this.terminalRightVel;
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

  p.getTerminalLeftVel = function(){
    var termVal = this.terminalLeftVel;
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

  p.getTerminalDownVel = function(){
    var termVal = this.terminalDownVel;
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

  p.getTerminalUpVel = function(){
    var termVal = this.terminalUpVel;
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

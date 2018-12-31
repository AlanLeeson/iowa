"use strict";

class PlayerEntity extends Entity{
	constructor(posX, posY, vertices, colour, mass, type) {
		super(posX, posY, vertices, colour, mass, "moveable");
		this.applyCollisions = false;
	  	this.terminalRightVel = 3;
	  	this.terminalLeftVel = -3;
	  	this.terminalUpVel = -3;
	  	this.terminalDownVel = 3;

    	this.sprint = false;
    	this.sneak = false;
	}
	
	moveLeft(force) {
		var termVel  = this.getTerminalVel(this.terminalLeftVel);
  		if(this.velocity[0] > 0) {this.velocity = vec2.fromValues(0, this.velocity[1]);}
		if(this.velocity[0] < termVel){
			this.velocity = vec2.fromValues(termVel, this.velocity[1]);
		} else {
			this.applyWorldForces(force);
		}
  	};

  	moveRight(force) {
      	var termVel  = this.getTerminalVel(this.terminalRightVel);
  		if(this.velocity[0] < 0) {this.velocity = vec2.fromValues(0, this.velocity[1]);}
		if(this.velocity[0] > termVel){
			this.velocity = vec2.fromValues(termVel, this.velocity[1]);
		} else {
			this.applyWorldForces(force);
		}
  	}

  	stopRightLeft() {
  		this.velocity[0] = 0;
  	}

  	moveDown(force) {
   	   var termVel  = this.getTerminalVel(this.terminalDownVel);
    	if(this.velocity[1] < 0) {this.velocity = vec2.fromValues(this.velocity[0], 0);}
		if(this.velocity[1] > termVel){
			this.velocity = vec2.fromValues(this.velocity[0], termVel);
		} else {
			this.applyWorldForces(force);
		}
  	}

  	moveUp(force) {
   		var termVel  = this.getTerminalVel(this.terminalUpVel);
    	if(this.velocity[1] > 0) {this.velocity = vec2.fromValues(this.velocity[0], 0);}
  		if(this.velocity[1] < termVel){
  			this.velocity = vec2.fromValues(this.velocity[0], termVel);
  		} else {
  			this.applyWorldForces(force);
  		}
  	}

  	stopUpDown() {
  	  this.velocity[1] = 0;
  	}
  	
  	startSprint() {
    	this.sprint = true;
  	}

  	stopSprint() {
    	this.sprint = false;
  	}

  	startSneak() {
    	this.sprint = false;
    	this.sneak = true;
  	}

  	stopSneak() {
    	this.sneak = false;
  	}

  	getTerminalVel(termVal) {
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
}
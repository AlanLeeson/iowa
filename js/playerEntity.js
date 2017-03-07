"use strict";

var app = app || {};

app.PlayerEntity = function(){

  var PlayerEntity = function(x,y,radius,col,mass,type){
    app.Entity.call(this,x,y,radius,col,mass,type);

    this.applyCollisions = false;
    this.health = 1000;
  };

  PlayerEntity.prototype = Object.create(app.Entity.prototype);
  PlayerEntity.prototype.construction = PlayerEntity;
  var p = PlayerEntity.prototype;


  p.render = function(ctx){
    if(this.sprite != null){
  		this.sprite.render(ctx, this.location);
  	} else {
      app.draw.opaqueCircle(ctx,this.location[0],this.location[1],this.radius,this.col);
    }
  }

  return PlayerEntity;
}();

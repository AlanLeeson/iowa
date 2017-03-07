"use strict"

var app = app || {};

function applyForce(force,acceleration){
	//divide the force by the mass
	force = vec2.fromValues(force[0]/2,force[1]/2);
	//add the force to acceleration
	vec2.add(acceleration, acceleration, force);
}

function updateLocation(velocity,acceleration,location){
	vec2.add(velocity,velocity,acceleration);
	//add velocity to location
	vec2.add(location,location,velocity);
	//Zero the acceleration
	acceleration = vec2.create();	
}

function seek(location,targetLocation,velocity,maxSpeed,maxForce){
	var desired = vec2.create();
	vec2.subtract(desired,targetLocation,location);
	vec2.normalize(desired,desired);
	vec2.scale(desired,desired,maxSpeed);
	var steer = vec2.create();
	vec2.subtract(steer,desired,velocity);
	vec2.scale(steer,steer,maxForce);
	return steer;
}

function arrive(location,targetLocation,velocity,maxSpeed,maxForce){
	var desired = vec2.create();
	vec2.subtract(desired,targetLocation,location);
	var mag = vec2.magnitude(desired);
	vec2.normalize(desired,desired);
	if(mag < 100){
		var m = map(mag,0,100,0,maxSpeed);
		vec2.scale(desired,desired,m);
	}else{
		vec2.scale(desired,desired,maxSpeed);
	}

	var steer = vec2.create();
	vec2.subtract(steer,desired,velocity);
	vec2.scale(steer,steer,maxForce);
	return steer;
}

function separate(entityLoc, velocity, entities, desiredSeparation, maxSpeed, maxForce){

	var vectorSum = vec2.create();
	var count = 0;

	for(var i = 0; i < entities.length; i ++){
		if(entities[i].location != entityLoc){
			var dist = vec2.dist(entityLoc,entities[i].location);
			if((dist >= 0) && (dist < desiredSeparation)){
				var dif = vec2.create();
				vec2.subtract(dif, entityLoc,entities[i].location);
				vec2.normalize(dif,dif);
				vec2.add(vectorSum,vectorSum,dif);
				count ++;
			}
		}
	}
	if(count > 0){
		vec2.divideByScalar(vectorSum,count);
		vec2.scale(vectorSum,vectorSum,maxSpeed);
		var steer = vec2.create();
		vec2.subtract(steer,vectorSum,velocity);
		limit(steer,maxForce);

		return steer;
	}

	return vectorSum;

}

function map(value,istart,istop,ostart,ostop){
	return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

function limit(vector,max) {
    if (magSquared(vec2.fromValues(vector[0],vector[1])) > max*max) {
    	vec2.normalize(vector,vector);
    	vec2.scale(vector,vector,max);
    }
 }

function magSquared(vector){
	return (vector[0] * vector[0] + vector[1] * vector[1]);
}
    
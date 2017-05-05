"use strict";

var app = app || {};

app.collision = {

  polygonCollision : function(loc1, pol1, loc2, pol2){


  },

  circleCollision : function(loc1, loc2, radius1, radius2){
    var dx = loc1[0] - loc2[0];
    var dy = loc1[1] - loc2[1];
    var distance = Math.sqrt(dx*dx + dy*dy);
    return distance < radius1 + radius2;
  },

  lineCollision : function(entityLoc, entityRadius, linePoint1, linePoint2){
    var ptX = entityLoc[0];
    var ptY = entityLoc[1];
    //console.log(rope.anchor1.location[0]);
    var p1X = linePoint1[0];
    var p2X = linePoint1[0];
    var p1Y = linePoint2[1];
    var p2Y = linePoint2[1];

    var dx = p2X - p1X;
    var dy = p2Y - p1Y;

    //if it's a point rather than a segment
    if((dx == 0) && (dy == 0)){
      var closest = {x: p1X, y: p1Y};
      dx = ptX - p1X;
      dy = ptY - p1Y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    //calculate the t that minimizes the distance
    var t = ((ptX - p1X) * dx + (ptY - p1Y) * dy) / (dx * dx + dy * dy);

    //see if this represents one of the segment's end points or a point in the middle.
    if(t < 0){
      var closest = {x: p1X, y: p1Y};
      dx = ptX - p1X;
      dy = ptY - p1Y;
    } else if(t > 1){
      var closest = {x: p2X, y: p2Y};
      dx = ptX - p2X;
      dy = ptY - p2Y;
    } else {
      var closest = {x: p1X + t * dx, y: p1Y + t * dy};
      dx = ptX - closest.x;
      dy = ptY - closest.y;
    }

    var leastDistance = Math.sqrt(dx * dx + dy * dy);

    return leastDistance < entityRadius;
  }
};

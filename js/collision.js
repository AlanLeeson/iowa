"use strict";

var app = app || {};

app.collision = {

  polygonCollision : function(pol1, pol2){
    for(var i = 0; i < pol1.length; i++)
    {
      if(this.isPointInsidePolygon(pol1[i], pol2))
      {
        return true;
      }
    }
    for(var i = 0; i < pol2.length; i++)
    {
      if(this.isPointInsidePolygon(pol2[i], pol1))
      {
        return true;
      }
    }
    return false;
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
  },

  isPointInsidePolygon : function(point, polygon){
    var intersectedPoints = [];

    var lowerBound = this.getPolygonLeftLowerBound(polygon);

    for(var i = 0; i < polygon.length; i++)
    {
      var start = polygon[i];
      var end =  polygon[(i + 1) % polygon.length];

      var intersectionPoint = this.findLineIntersection(point, lowerBound, start, end);

      if(intersectionPoint != null)
      {
        if(intersectionPoint == point)
        {
          return true;
        }
        else if (intersectedPoints.filter(
                    function(point){
                      return point[0] === intersectionPoint[0] && point[1] === intersectionPoint[1]
                    }).length === 0)
        {
          intersectedPoints.push(intersectionPoint);
        }
      }
    }

    return !(intersectedPoints.length % 2 == 0);
  },

  findLineIntersection : function(line1point1, line1point2, line2point1, line2point2){
    var diffSlope = ((line1point2[0] - line1point1[0]) * (line2point2[1] - line2point1[1])) -
      ((line1point2[1] - line1point1[1]) * (line2point2[0] - line2point1[0]));

    if(diffSlope == 0 && this.getYIntercept(line1point1, line1point2) == this.getYIntercept(line2point1, line2point2) &&
      line1point1 != line1point2 && line2point1 != line2point2)
    {
      if((line1point1[0] >= line2point1[0] && line1point2[0] <= line2point1[0]) &&
          (line1point1[1] >= line2point1[1] && line1point2[1] <= line1point1[1]))
      {
        return line2point1;
      }
      else if ((line2point1[0] >= line1point1[0] && line2point2[0] <= line1point1[0]) &&
          (line2point1[1] >= line1point1[1] && line2point2[1] <= line1point1[1]))
      {
        return line1point1;
      }
      else
      {
        return null;
      }
    }

    var n1 = ((line1point1[1] - line2point1[1]) * (line2point2[0] - line2point1[0])) -
      ((line1point1[0] - line2point1[0]) * (line2point2[1] - line2point1[1]));

    var r = n1 / diffSlope;

    var n2 = ((line1point1[1] - line2point1[1]) * (line1point2[0] - line1point1[0])) -
      ((line1point1[0] - line2point1[0]) * (line1point2[1] - line1point1[1]));

    var s = n2 / diffSlope;

    if((r < 0 || r > 1) || (s < 0 || s > 1))
      return null;

    var x = line1point1[0] + (r * (line1point2[0] - line1point1[0]));
    var y = line1point1[0] + (r * (line1point2[1] - line1point1[1]));

    return isNaN(x) || isNaN(y) ? null : vec2.fromValues(x, y);
  },

  getYIntercept : function(linePoint1, linePoint2){
    var m = ((linePoint2[1] - linePoint1[1]) / (linePoint2[0] - linePoint1[0]));
    var b = linePoint1[1] - (m * linePoint1[0]);

    return b;
  },

  getPolygonLeftLowerBound : function(polygon) {
    var x = polygon[0][0];
    var y = polygon[0][1];

    for(var i = 0; i < polygon.length; i++)
    {
      if(polygon[i][0] < x)
        x = polygon[i][0];

      if(polygon[i][1] < y)
        y = polygon[i][1];
    }

    return vec2.fromValues(x - 10, y - 10);
  }
};

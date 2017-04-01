"use strict";

var app = app || {};

app.Camera = function(){

  var Camera = function(ctx, settings) {
    settings = settings || {};
    this.distance = 1250.0;
    this.lookat = [0,0];
    this.context = ctx;
    this.fieldOfView = settings.fieldOfView || Math.PI / 4.0;
    this.viewport = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
      scale: [1.0, 1.0]
    };
    this.updateViewport();
    this.follow = null;
  };

  var p = Camera.prototype;

  p.begin = function() {
      this.context.save();
      this.applyScale();
      this.applyTranslation();
      if (this.follow != null) {
        this.moveTo(this.follow.location[0], this.follow.location[1]);
      }
  };

  p.end = function() {
      this.context.restore();
  };

  p.applyScale = function() {
    this.context.scale(this.viewport.scale[0], this.viewport.scale[1]);
  };

  p.applyTranslation = function() {
    this.context.translate(-this.viewport.left, -this.viewport.top);
  };

  p.updateViewport = function() {
      this.aspectRatio = this.context.canvas.width / this.context.canvas.height;
      this.viewport.width = this.distance * Math.tan(this.fieldOfView);
      this.viewport.height = this.viewport.width / this.aspectRatio;
      this.viewport.left = this.lookat[0] - (this.viewport.width / 2.0);
      this.viewport.top = this.lookat[1] - (this.viewport.height / 2.0);
      this.viewport.right = this.viewport.left + this.viewport.width;
      this.viewport.bottom = this.viewport.top + this.viewport.height;
      this.viewport.scale[0] = this.context.canvas.width / this.viewport.width;
      this.viewport.scale[1] = this.context.canvas.height / this.viewport.height;
  };

  p.zoomTo = function(z) {
      this.distance = z;
      this.updateViewport();
  };

  p.moveTo = function(x, y) {
      this.lookat[0] = x;
      this.lookat[1] = y;
      this.updateViewport();
  };

  p.followEntity = function(followee){
    this.follow = followee;
  };

  p.screenToWorld = function(x, y, obj) {
      obj = obj || {};
      obj.x = (x / this.viewport.scale[0]) + this.viewport.left;
      obj.y = (y / this.viewport.scale[1]) + this.viewport.top;
      return obj;
  };

  p.worldToScreen = function(x, y, obj) {
      obj = obj || {};
      obj.x = (x - this.viewport.left) * (this.viewport.scale[0]);
      obj.y = (y - this.viewport.top) * (this.viewport.scale[1]);
      return obj;
  };

  p.getViewport = function () {
      return this.viewport;
  };

  return Camera;

}();

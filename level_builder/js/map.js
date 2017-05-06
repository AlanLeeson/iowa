"use strict";

var app = app || {};

app.Map = function(){

  var Map = function (width, height, s_dimension)
  {
    this.width = width;
    this.height = height;
    this.s_dimension = s_dimension;
    this.sprite = null;
  };

  var p = Map.prototype;

  p.generate = function(ctx)
  {
		var rows = ~~(this.width/10) + 1;
		var columns = ~~(this.height/10) + 1;

		var color = "grey";
		ctx.save();
		for (var x = 0, i = 0; i < rows; x+=this.s_dimension, i++) {
			for (var y = 0, j=0; j < columns; y+=this.s_dimension, j++) {
				app.draw.strokeRect(ctx, x, y, this.s_dimension, this.s_dimension, color);
			}
		}
		ctx.restore();

		// store the generate map as this image texture
		this.sprite = new Image();
		this.sprite.src = ctx.canvas.toDataURL("image/png");
  };

  p.render = function(ctx){
			ctx.drawImage(this.sprite, 0, 0, this.width, this.height);
	};

  return Map;

}();

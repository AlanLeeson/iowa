"use strict";

var app = app || {};

app.Map = function(){

  var Map = function (width, height)
  {
    this.width = width;
    this.height = height;

    this.sprite = null;
  };

  var p = Map.prototype;

  p.generate = function(ctx)
  {
			var rows = ~~(this.width/44) + 1;
			var columns = ~~(this.height/44) + 1;

			var color = "red";
			ctx.save();
			ctx.fillStyle = "red";
			for (var x = 0, i = 0; i < rows; x+=88, i++) {
				ctx.beginPath();
				for (var y = 0, j=0; j < columns; y+=88, j++) {
					ctx.rect (x, y, 80, 80);
				}
				color = app.draw.randomRGBA();
				ctx.fillStyle = color;
				ctx.fill();
				ctx.closePath();
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

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
			this.width = ctx.canvas.width;
			this.height = ctx.canvas.height;

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
				color = (color == "red" ? "blue" : "red");
				ctx.fillStyle = color;
				ctx.fill();
				ctx.closePath();
			}
			ctx.restore();

			// store the generate map as this image texture
			this.sprite = new Image();
			this.sprite.src = ctx.canvas.toDataURL("image/png");
  };

  p.render = function(ctx, xView, yView){
      var sx, sy, dx, dy;
      var sWidth, sHeight, dWidth, dHeight;

			// offset point to crop the image
			sx = xView;
			sy = yView;

			// dimensions of cropped image
			sWidth =  ctx.canvas.width;
			sHeight = ctx.canvas.height;

			// if cropped image is smaller than canvas we need to change the source dimensions
			if(this.sprite.width - sx < sWidth){
				sWidth = this.sprite.width - sx;
			}
			if(this.sprite.height - sy < sHeight){
				sHeight = this.sprite.height - sy;
			}

			// location on canvas to draw the croped image
			dx = 0;
			dy = 0;
			// match destination with source to not scale the image
			dWidth = sWidth;
			dHeight = sHeight;

			ctx.drawImage(this.sprite, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	};

  return Map;

}();

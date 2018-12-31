"use strict";

var app = app || {};

class Map {

  constructor (width, height) {
    this.width = width;
    this.height = height;

    this.sprite = null;
  };
  
  generate(ctx)
  {
		var rows = ~~(this.width/44) + 1;
		var columns = ~~(this.height/44) + 1;

		var color = "red";
		ctx.save();
		ctx.fillStyle = "red";
		for (var x = 0, i = 0; i < rows; x+=80, i++) {
			for (var y = 0, j=0; j < columns; y+=80, j++) {
                ctx.beginPath();
				ctx.rect (x, y, 80, 80);
                color = app.draw.randomGray(255, 200);
    			ctx.fillStyle = color;
    			ctx.fill();
    			ctx.closePath();
			}
		}
		ctx.restore();

		// store the generate map as this image texture
		this.sprite = new Image();
		this.sprite.src = ctx.canvas.toDataURL("image/png");
  };

  render(ctx){
			ctx.drawImage(this.sprite, 0, 0, this.width, this.height);
	};

};

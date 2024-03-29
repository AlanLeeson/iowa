"use strict"

var app = app || {};

app.draw = {

	clear: function(ctx,x,y,w,h){
		ctx.clearRect(x,y,w,h);
	},

	rect: function(ctx,x,y,w,h,col){
		ctx.fillStyle = col;
		ctx.fillRect(x,y,w,h);
	},

	circle: function(ctx,x,y,r,col){
		ctx.fillStyle = col;
		ctx.beginPath();
		ctx.arc(x,y,r,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
	},

	opaqueCircle : function(ctx,x,y,r,col){
		ctx.strokeStyle = col;
		ctx.fillStyle = col;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(x,y,r,0,Math.PI*2,true);
		ctx.closePath();
		ctx.stroke();
		ctx.globalAlpha = 0.5;
		ctx.fill();
		ctx.globalAlpha = 1.0;
	},

	text: function(ctx, value, x, y, size, col, alignment){
		ctx.font = 'bold ' + size + 'px veranda';
		if (alignment) {
			ctx.textAlign = alignment;
		}
		ctx.fillStyle = col;
		ctx.fillText(value,x,y);
	},

	line: function(ctx,x1,y1,x2,y2,w,col){
		ctx.strokeStyle = col;
		ctx.lineWidth = w;
		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.closePath();
		ctx.stroke();
	},

	polygonCircle : function(ctx,x,y,r,s,col){
		ctx.strokeStyle = col;
		ctx.fillStyle = col;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+r*Math.cos(0),y+r*Math.sin(0));
		for(var i = 1; i < s; i++){
			ctx.lineTo(x + r * Math.cos(i * 2 * Math.PI / s),
				y + r * Math.sin(i * 2 * Math.PI / s));
		}
		ctx.lineTo(x+r*Math.cos(0),y+r*Math.sin(0));
		ctx.stroke();
		ctx.globalAlpha = 0.5;
		ctx.fill();
		ctx.globalAlpha = 1.0;
	},

	polygon : function(ctx,x,y,vertices,col){
		ctx.strokeStyle = col;
		ctx.fillStyle = col;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x + vertices[0][0], y + vertices[0][1]);
		for(var i = 1; i < vertices.length; i++){
			var vertex = vertices[i];
			ctx.lineTo(x + vertex[0], y + vertex[1]);
		}
		ctx.lineTo(x + vertices[0][0], y + vertices[0][1]);
		ctx.closePath();
		ctx.stroke();
		ctx.globalAlpha = 0.5;
		ctx.fill();
		ctx.globalAlpha = 1.0;
	},

	randomRGBA : function(high = 255, low = 0, alpha = 1){
		high = high > 255 || high < 0 ? 255 : high;
		low = low < 0 || low > 255 ? 0 : low;
		alpha = alpha < 0 || alpha > 1 ? 1 : alpha;
		var difference = high - low;
		var red = parseInt(Math.random() * difference + low);
		var green = parseInt(Math.random() * difference + low);
		var blue = parseInt(Math.random() * difference + low);
		return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
	},

	randomGray : function(high = 255, low = 0, alpha = 1) {
		high = high > 255 || high < 0 ? 255 : high;
		low = low < 0 || low > 255 ? 0 : low;
		alpha = alpha < 0 || alpha > 1 ? 1 : alpha;
		var difference = high - low;
		var gray_color = parseInt(Math.random() * difference + low);
		return 'rgba(' +  gray_color + ',' + gray_color + ',' + gray_color + ',' + alpha + ')';
	}
};

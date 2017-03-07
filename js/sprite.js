"use strict"

var app = app || {};

app.Sprite = function(){

	function Sprite(url, pos, frame_size, size, speed, frames, dir, once) {
		this.pos = pos;
		this.frame_size = frame_size;
		this.size = size;
		this.speed = typeof speed === 'number' ? speed : 0;
		this.frames = frames;
		this._index = 0;
		this.url = url;
		this.dir = dir || 'horizontal';
		this.once = once;
	};

	var p = Sprite.prototype;

	p.update = function(dt) {
    	this._index += this.speed*dt;
	};

	p.setLocation = function(location) {
		this.location = location;
	};

	p.render = function(ctx, location) {
		if(!resources.get(this.url)) {return; }
		var frame;

		var center = vec2.fromValues(location[0]-(this.size[0]/2), location[1] - (this.size[1]/2))
		if(this.speed > 0) {
			var max = this.frames.length;
			var idx = Math.floor(this._index);
			frame = this.frames[idx % max];

			if(this.once && idx >= max) {
				this.done = true;
				return;
			}
		} else {frame = 0; }

		var x = this.pos[0];
		var y = this.pos[1];

		if(this.dir == 'vertical') {
			y += frame * this.frame_size[1];
		} else {
			x += frame * this.frame_size[0];
		}
		ctx.drawImage(resources.get(this.url), x, y, this.frame_size[0], this.frame_size[1], center[0], center[1], this.size[0], this.size[1]);
	}

	return Sprite;

}();

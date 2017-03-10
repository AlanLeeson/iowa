"use strict"

var app = app || {};

app.helpers = {

  rectangle: function()(left, top, width, height){
		this.left = left || 0;
		this.top = top || 0;
    this.width = width || 0;
		this.height = height || 0;
		this.right = this.left + this.width;
		this.bottom = this.top + this.height;
	}

}();

"use strict";

var app = app || {};

app.Menu = function(){

	var Menu = function(type, size){
		this.type = type;
		this.controller = null;

		this.listeners = [];
		this.buttons = [];
		this.texts = [];
		this.size = size
		this.title;
		this.backgroundSprite = undefined;
	};

	var p = Menu.prototype;

	p.updateMenuEvent = function(){
		for(var i = 0; i < this.listeners.length; i++){
			this.listeners[i].doUpdateMenuEvent(this);
		}
	}

	p.addButton = function(button){
		this.buttons.add(button);
	};

	p.addTitle = function(title){
		this.title = title;
	};

	p.setBackgroundSprite = function(sprite){
		this.backgroundSprite = sprite;
	};

	p.setController = function(controller){
		this.controller = controller;
		this.controller.init();
	};

	p.addText = function(text){
		this.texts.push(text);
	};

	p.update = function(dt){

	};

	p.render = function(ctx){
		if (this.backgroundSprite != undefined) {
			this.backgroundSprite.render(ctx, this.size);
		}
		for(var i = 0; i < this.texts.length; i ++) {
			var text = this.texts[i];
			app.draw.text(ctx, text.text, text.xPos, text.yPos, text.size, text.col);
		}
		if (this.title != undefined) {
			app.draw.text(ctx,this.title,100,50,30,'rgba(50,50,50,1)');
		}
	};

	return Menu;

}();

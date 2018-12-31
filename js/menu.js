"use strict";

class Menu {

	constructor(type, size){
		this.type = type;
		this.controller = null;

		this.listeners = [];
		this.buttons = [];
		this.texts = [];
		this.size = size
		this.title;
		this.backgroundSprite = undefined;
	};
	
	updateMenuEvent() {
		for(var i = 0; i < this.listeners.length; i++){
			this.listeners[i].doUpdateMenuEvent(this);
		}
	}

	addButton(button) {
		this.buttons.add(button);
	};

	addTitle(title) {
		this.title = title;
	};

	setBackgroundSprite(sprite) {
		this.backgroundSprite = sprite;
	};

	setController(controller) {
		this.controller = controller;
		this.controller.init();
	};

	addText(text) {
		this.texts.push(text);
	};

	update(dt) {

	};

	render(ctx) {
		if (this.backgroundSprite != undefined) {
			this.backgroundSprite.render(ctx, this.size);
		} else {
			app.draw.rect(ctx, 0, 0, app.Main.screenBounds.width, app.Main.screenBounds.height, '#ffccab');
		}
		for(var i = 0; i < this.texts.length; i ++) {
			var text = this.texts[i];
			app.draw.text(ctx, text.text, text.xPos, text.yPos, text.size, text.col);
		}
		if (this.title != undefined) {
			app.draw.text(ctx,this.title,100,50,30,'rgba(50,50,50,1)');
		}
	};
};

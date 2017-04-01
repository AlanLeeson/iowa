"use strict";

var app = app || {};

app.Main = {

	canvas : undefined,
	ctx : undefined,

	loadedForces : undefined,
	world : undefined,
	screenBounds : undefined,
	gameObject : undefined,
	menu : undefined,

	//var used for finding dt
	updatedTime : 0,
	ratio : undefined,

	init : function(){

		/*** Assign the canvas and the canvas context ***/
		this.ratio = 400/400;
		this.canvas = document.querySelector('canvas');
		this.canvas.style.width = window.innerWidth + 'px';
    	this.canvas.style.height = (window.innerHeight * this.ratio) + 'px';
		this.ctx = this.canvas.getContext('2d');

		/*** Initialize the first room ***/
		var room = {
			width: 2000,
			height: 1000,
			map: new app.Map(2000, 1000)
		};
		room.map.generate(this.ctx);

		/*** Set up the game object which holds game logic and states. ***/
		this.screenBounds = {width : this.canvas.width, height: this.canvas.height};
		this.gameObject = new app.GameObject();
		this.gameObject.setCurrentState("MENU");

		/*** Set up a generic keyboard controller to handle customizable inputs ***/
		var keyboardController = new app.KeyboardController();
		keyboardController.assignKeyAction(["r"], function(gameObject)
		{
			if(gameObject.getCurrentState() === gameObject.states.PLAY)
			{
				gameObject.setCurrentState("PAUSE");
			}
			else if(gameObject.getCurrentState() === gameObject.states.PAUSE)
			{
				gameObject.setCurrentState("PLAY");
			}
		}, true);
		keyboardController.assignKeyAction(["m"], function(gameObject)
		{
			if(gameObject.getCurrentState() === gameObject.states.PLAY)
			{
				gameObject.setCurrentState("MENU");
			}
			else if(gameObject.getCurrentState() === gameObject.states.MENU)
			{
				gameObject.setCurrentState("PLAY");
			}
		}, true);
		this.gameObject.setController(keyboardController);

		/*** Initialize menu ***/
		this.menu = new app.Menu("main", vec2.fromValues(this.screenBounds.width / 2, this.screenBounds.height / 2));
		this.menu.addText({
			"text" : "Press \"m\" to Play",
			"xPos" : (this.screenBounds.width * 3 / 10),
			"yPos" : (this.screenBounds.height * 5 / 6),
			"size" : "50",
			"col" : app.draw.randomRGBA(100)
		});
		this.gameObject.setMenu(this.menu);

		/*** Initialize world and its conditions ***/
		this.loadedForces = [vec2.fromValues(0.0,0.0)];
		this.world = new app.World(this.loadedForces);
		this.gameObject.setWorld(this.world);

		/*** Create a Player ***/
		var player = new app.PlayerEntity(room.width/2, room.height/2, 15, app.draw.randomRGBA(), 1, 'moveable');
		player.assignBounds(0, room.width, room.height, 0);
		var playerController = new app.KeyboardController();
		playerController.assignKeyAction([ "a", "ArrowLeft" ], function(entity)
		{
			entity.moveLeft([vec2.fromValues(-0.3, 0)]);
		});
		playerController.assignKeyAction([ "d", "ArrowRight" ], function(entity)
		{
			entity.moveRight([vec2.fromValues(0.3, 0)]);
		});
		playerController.assignKeyUpAction([ "a", "ArrowLeft", "d", "ArrowRight" ], function(entity)
		{
			entity.stopRightLeft();
		});
		playerController.assignKeyAction([ "w", "ArrowUp" ], function(entity)
		{
			entity.moveUp([vec2.fromValues(0, -0.3)]);
		});
		playerController.assignKeyAction([ "s", "ArrowDown"], function (entity)
		{
			entity.moveDown([vec2.fromValues(0, 0.3)]);
		});
		playerController.assignKeyUpAction([ "w", "ArrowUp", "s", "ArrowDown"], function (entity)
		{
			entity.stopUpDown();
		})
		player.setController(playerController);
		this.world.addEntity(player);
		this.world.addEntity(new app.Entity(this.screenBounds.width/2,50,20,app.draw.randomRGBA(),1,"moveable"))

		/*** Initialize the camera ***/
		var camera = new app.Camera(this.ctx);
		camera.followEntity(player);
		this.world.setCamera(camera);
		this.world.setRoom(room);

		//call the game loop to start the game
		this.gameLoop();
	},

	//loops the game
	gameLoop : function(){
		//calls this method every frame
		requestAnimationFrame(this.gameLoop.bind(this));
    	this.update();
    	this.render(this.ctx);
	},

	//renders all objects in the game
	render : function(ctx){
		app.draw.rect(ctx,0,0,this.canvas.width,this.canvas.height,"#eee");
		this.gameObject.render(ctx);
	},

	//updates the objects in the game
	update : function(){
		//find deltaTime
		var dt  = this.calculateDeltaTime();
		this.gameObject.update(dt);
	},

	//calculate delta time to maintain a frame rate
	calculateDeltaTime : function(){
		var now, fps;
		now = (+new Date);
		fps = 1000/(now - this.updatedTime);
		fps = this.clamp(fps,12,60);
		this.updatedTime = now;
		return 1/fps;
	},

	//helper function to stop values from exceeding bounds
	clamp : function(val,min,max){
		return Math.max(min,Math.min(max,val));
	}

};

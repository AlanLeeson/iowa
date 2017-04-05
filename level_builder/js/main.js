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
	builder : undefined,
	mousepos : undefined,

	//var used for finding dt
	updatedTime : 0,

	init : function(){

		/*** Assign the canvas and the canvas context ***/
		this.canvas = document.querySelector('canvas');
		this.canvas.style.width = window.innerWidth + 'px';
    	this.canvas.style.height = window.innerHeight + 'px';
		this.ctx = this.canvas.getContext('2d');

		/*** Initialize the first room ***/
		var room = {
			width: 2000,
			height: 2000,
			map: new app.Map(2000, 2000)
		};
		room.map.generate(this.ctx);

		/*** Initliaze level builder ***/
		this.builder = new app.Builder();
		this.world = new app.World(this.loadedForces);

		/*** Set up the game object which holds game logic and states. ***/
		this.screenBounds = {width : this.canvas.width, height: this.canvas.height};
		this.gameObject = new app.GameObject();
		this.gameObject.setCurrentState("MENU");

		var camera = new app.Camera(this.ctx);

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

		var _builder = this.builder;
		keyboardController.assignKeyAction(["1"], function (gameObject)
		{
			_builder.assignAsset(new app.Sprite("assets/tile2.png", [0, 0], [200, 200], [50, 50], 0, [0]));
		}, true);

		var mouseController = new app.mouseController();
		var _mouseController = mouseController;
		var _world = this.world;
		mouseController.assignMouseClickAction(function (gameObject) {
		    if (_builder.sprite != null)
			{
				var entity_pos = _mouseController.canvasMousePosition();
				var new_entity = new app.Entity(entity_pos[0], entity_pos[1], 3, "", 1, "stationary");
				new_entity.setSprite(new app.Sprite("assets/tile2.png", [0, 0], [200, 200], [50, 50], 0, [0]));
				_world.addEntity(new_entity);
			}
		});
		var _camera = camera;
		mouseController.assignMouseMoveAction(function (gameObject) {
			_mouseController.setCanvasOffset(_camera.getViewport());
			_builder.assignMouseLocation(_mouseController.canvasMousePosition());
		});
		this.world.addEntity(this.builder);
		this.gameObject.setController(mouseController);
		this.gameObject.setController(keyboardController);

		/*** Initialize world and its conditions ***/
		this.gameObject.setWorld(this.world);

		/*** Create a Player ***/
		var player = new app.PlayerEntity(room.width/2, room.height/2, 15, app.draw.randomRGBA(), 1, 'moveable');
		player.assignBounds(0, room.width, room.height, 0);
		var playerController = new app.KeyboardController();
		playerController.assignKeyAction([ "a", "ArrowLeft" ], function(entity)
		{
			entity.moveLeft([vec2.fromValues(-0.5, 0)]);
		});
		playerController.assignKeyAction([ "d", "ArrowRight" ], function(entity)
		{
			entity.moveRight([vec2.fromValues(0.5, 0)]);
		});
		playerController.assignKeyUpAction([ "a", "ArrowLeft", "d", "ArrowRight" ], function(entity)
		{
			entity.stopRightLeft();
		});
		playerController.assignKeyAction([ "w", "ArrowUp" ], function(entity)
		{
			entity.moveUp([vec2.fromValues(0, -0.5)]);
		});
		playerController.assignKeyAction([ "s", "ArrowDown"], function (entity)
		{
			entity.moveDown([vec2.fromValues(0, 0.5)]);
		});
		playerController.assignKeyUpAction([ "w", "ArrowUp", "s", "ArrowDown"], function (entity)
		{
			entity.stopUpDown();
		})
		player.setController(playerController);
		this.world.addEntity(player);
		this.world.addEntity(new app.Entity(this.screenBounds.width/2,50,20,app.draw.randomRGBA(),1,"moveable"))

		/*** Initialize the camera ***/
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
		//this.builder.render(ctx);
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
	},

	//helper function to get mouse coordinates
	mousepos : function () {

	}

};

"use strict";

var app = app || {};

app.Main = {

	canvas : undefined,
	ctx : undefined,
	ui : undefined,

	fps : 0,

	loadedForces : undefined,
	world : undefined,
	screenBounds : undefined,
	gameObject : undefined,
	menu : undefined,

	//var used for finding dt
	updatedTime : 0,

	updating : false,

	init : function(){

		/*** Assign the canvas and the canvas context ***/
		this.canvas = document.querySelector('canvas');

		//this.canvas.style.width = this.clamp(window.innerWidth, 0, 1400) + 'px';
		//this.canvas.height = this.canvas.width * this.canvas.clientHeight / this.canvas.clientWidth;
		this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext('2d');

		/*** Initialize UI ***/
		this.ui = new app.UI();

		/*** Initialize the first room ***/
		var room = {
			width: 2000,
			height: 1000,
			map: new Map(2000, 1000)
		};
		room.map.generate(this.ctx);

		/*** Set up the game object which holds game logic and states. ***/
		this.screenBounds = {width : this.canvas.width, height: this.canvas.height};
		this.gameObject = new GameObject();
		this.gameObject.setCurrentState("MENU");

		/*** Set up a generic keyboard controller to handle customizable inputs ***/
		var keyboardController = new KeyboardController();
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
		var _ui = this.ui;
		this.gameObject.setController(keyboardController);

		/*** Initialize menu ***/
		this.menu = new Menu("main", vec2.fromValues(this.screenBounds.width / 2, this.screenBounds.height / 2));
		this.menu.addText({
			"text" : "Press \"m\" to Play",
			"xPos" : (this.screenBounds.width / 2),
			"yPos" : (this.screenBounds.height / 2),
			"size" : "50",
			"col" : app.draw.randomRGBA(100),
			"alignment": "center"
		});
		this.gameObject.setMenu(this.menu);

		/*** Initialize world and its conditions ***/
		this.loadedForces = [vec2.fromValues(0.0,0.0)];
		this.world = new app.World(this.loadedForces);
		this.gameObject.setWorld(this.world);

		/*** Create a Player ***/
		var player = new PlayerEntity(
				200, 200,
				[
					vec2.fromValues(0,0),
					vec2.fromValues(15,10),
					vec2.fromValues(30,0),
					vec2.fromValues(30,30),
					vec2.fromValues(15,20),
					vec2.fromValues(0,30)
				],
				app.draw.randomRGBA(100,0));
		var playerController = new KeyboardController();
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
		});
		playerController.assignKeyAction([ "l", "L"], function (entity)
		{
			entity.startSprint();
		});
		playerController.assignKeyUpAction([ "l", "L"], function (entity)
		{
			entity.stopSprint();
		});
		playerController.assignKeyAction([ "k", "K"], function (entity)
		{
			entity.startSneak();
		});
		playerController.assignKeyUpAction([ "k", "K"], function (entity)
		{
			entity.stopSneak();
		});
		var _world = this.world;
		playerController.assignKeyAction([ "j", "J"], function (entity)
		{
			for(var i = 0; i < _world.numEntities(); i++)
			{
				var otherEntity = _world.getEntity(i);
				distance = vec2.distance(entity.getCenter(), otherEntity.getCenter());
				if(distance > 0 && distance < 50){
					var force = vec2.distanceVector(entity.getCenter(), otherEntity.getCenter());
					otherEntity.applyForce(vec2.multiplyByScalar(force, 0.25));
				}
			}
		});
		player.setController(playerController);
		this.world.addEntity(player);

		/*** Create world blocks ***/
		var bw = 100;
		var left_wall = new Entity(0,0,
			[
				vec2.fromValues(0,0),
				vec2.fromValues(bw,0),
				vec2.fromValues(bw,room.height),
				vec2.fromValues(0,room.height)
			],
			"#000");
		this.world.addEntity(left_wall)
		var top_wall = new Entity(0,0,
			[
				vec2.fromValues(bw,0),
				vec2.fromValues(room.width,0),
				vec2.fromValues(room.width,bw),
				vec2.fromValues(bw,bw)
			],
			"#000");
		this.world.addEntity(top_wall)
		var right_wall = new Entity(0,0,
			[
				vec2.fromValues(room.width - bw,bw),
				vec2.fromValues(room.width,bw),
				vec2.fromValues(room.width,room.height),
				vec2.fromValues(room.width - bw,room.height)
			],
			"#000");
		this.world.addEntity(right_wall)
		var bottom_wall = new Entity(0,0,
			[
				vec2.fromValues(bw,room.height - bw),
				vec2.fromValues(room.width - bw,room.height - bw),
				vec2.fromValues(room.width - bw,room.height),
				vec2.fromValues(bw,room.height)
			],
			"#000");
		this.world.addEntity(bottom_wall)

		var middle_structure = new Entity(100,500,
			[
				vec2.fromValues(0,0),
				vec2.fromValues(room.width - 300,0),
				vec2.fromValues(room.width - 300,300),
				vec2.fromValues(0,300)
			],
			"#000");
		this.world.addEntity(middle_structure)
		
		for(var i = 0; i < 10; i ++) {
			for(var j = 0; j < 10; j++) {
				var block = new Entity((900 + (i * 31)), (150 + (j * 31)),
					[
						vec2.fromValues(-15,-15),
						vec2.fromValues(15,-15),
						vec2.fromValues(15,15),
						vec2.fromValues(-15,15)
					],
					"#000");
				block.setCollisionResolution(function () {
					
					this.setRemoveCondition(function () {
							return true;
					});
				});
				this.world.addEntity(block);
			}
		}

		var first_block = new Entity(400, 300,
			[
				vec2.fromValues(-50,-50),
				vec2.fromValues(0,-75),
				vec2.fromValues(50,-50),
				vec2.fromValues(50,50),
				vec2.fromValues(0,75),
				vec2.fromValues(-50,50)
			],
			"#3dd");
		first_block.setCollisionResolution(function(){
			_ui.startTypedDialogue("<strong>Hey!</strong> You think you can just <i>walk into me</i> huh? If I wasn't a <strong>block</strong> you'd be getting a piece of my mind!", 6000);
			first_block.setCollisionResolution(null);
		});

		first_block.setCustomLogic(function(entity){
			if(player.sprint)
			{
				if(vec2.distance(entity.getCenter(), player.getCenter()) < 100){
					_ui.startTimedDialogue("<strong>Hey!</strong> Stop running!", 6000);
					entity.setCustomLogic(null);
			 }
			}
		});
		this.world.addEntity(first_block);

		var npc = new MoveableEntity(600, 260,
			[
				vec2.fromValues(0,0),
				vec2.fromValues(15,0),
				vec2.fromValues(15,15),
				vec2.fromValues(0,15)
			],
			"#300",1,0.9);
		npc.setCollisionResolution(function(entity){
			this.applyForce(entity.velocity);
		});
		this.world.addEntity(npc);

		var npc2 = new MoveableEntity(800, 260,
			[
				vec2.fromValues(0,0),
				vec2.fromValues(15,0),
				vec2.fromValues(15,15),
				vec2.fromValues(0,15)
			],
			"#030",1,0.75);
		npc2.setCollisionResolution(function(entity){
			this.applyForce(entity.velocity);
		});
		this.world.addEntity(npc2);

		var stationary = new MoveableEntity(600, 160,
			[
				vec2.fromValues(0,0),
				vec2.fromValues(15,10),
				vec2.fromValues(30,0),
				vec2.fromValues(30,30),
				vec2.fromValues(15,20),
				vec2.fromValues(0,30)
			],
			"#300");
		this.world.addEntity(stationary);

		/*** Initialize the camera ***/
		var camera = new Camera(this.ctx);
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
		app.draw.rect(ctx,0,0,this.canvas.width,this.canvas.height,"#000");
		this.gameObject.render(ctx);
		app.draw.text(ctx,"FPS: " + this.fps.toFixed(0), 960, 50, 40, "#efefef");

		this.ui.updateDialogue();
	},

	//updates the objects in the game
	update : function(){
		if(this.updating)
			return;

		this.updating = true;

		//find deltaTime
		var dt  = this.calculateDeltaTime();
		this.gameObject.update(dt);

		this.updating = false;
	},

	//calculate delta time to maintain a frame rate
	calculateDeltaTime : function(){
		var now;
		now = (+new Date);
		this.fps = 1000/(now - this.updatedTime);
		this.fps = this.clamp(this.fps,12,60);
		this.updatedTime = now;
		return 1/this.fps;
	},

	//helper function to stop values from exceeding bounds
	clamp : function(val,min,max){
		return Math.max(min,Math.min(max,val));
	}

};

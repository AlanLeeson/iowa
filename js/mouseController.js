"use strict";

class mouseController {

    constructor(){
        this.mouseDownActions = [];
        this.mouseMoveActions = [];
	    this.mouseClickActions = [];
        this.mousedown = false;
        this.once = false;
        this.moved = false;
        this.mousepos = vec2.create();
        this.canvasOffset = vec2.create();
    };
    
    init() {
        var _this = this;

        window.addEventListener("mousedown", function(e){
            _this.mousedown = true;
        });

        window.addEventListener("click", function (e) {
            _this.once = true;
        });

        window.addEventListener("mouseup", function (e) {
            _this.mousedown = false;
        });

        window.addEventListener("mousemove", function (e) {
            var x = e.clientX; + _this.canvasOffset[0];
            var y = e.clientY; + _this.canvasOffset[1];
            _this.mousepos = vec2.fromValues(x, y);
            _this.moved = true;
        });
    };

	assignMouseDownAction(action) {
		this.mouseDownActions.push(action);
	};

    assignMouseClickAction(action) {
        this.mouseClickActions.push(action);
    };

    assignMouseMoveAction(action) {
        this.mouseMoveActions.push(action);
    };

    setCanvasOffset(viewport) {
        this.canvasOffset = vec2.fromValues(-viewport.left, -viewport.top);
    };

    update(object) {
        if (this.once)
        {
            for (var action in this.mouseClickActions) {
                this.mouseClickActions[action](object);
            }
            this.once = false;
        } else if (this.mousedown) {
            for (var action in this.mouseDownActions) {
                this.mouseDownActions[action](object);
            }
        }

        if (this.moved)
        {
            for (var action in this.mouseMoveActions) {
                this.mouseMoveActions[action](object);
            }
            this.moved = false;
        }
    };

    mousePosition() {
        return this.mousepos;
    };

    canvasMousePosition() {
        return vec2.fromValues(this.mousepos[0] - this.canvasOffset[0], this.mousepos[1] - this.canvasOffset[1]);
    }
};

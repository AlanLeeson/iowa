"use strict";

var app = app || {};

app.mouseController =  function () {

    var mouseController = function(){
        this.mouseDownActions = [];
        this.mouseUpActions = [];
	    this.mouseClickActions = [];
        this.mousedown = false;
        this.once = false;
    };

    var p = mouseController.prototype;

    p.init = function () {
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
    };

	p.assignMouseDownAction = function (action) {
		this.mouseDownActions.push(action);
	};

    p.assignMouseClickAction = function (action) {
        this.mouseClickActions.push(action);
    }

    p.update = function (object) {
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
    };

    return mouseController;

}();

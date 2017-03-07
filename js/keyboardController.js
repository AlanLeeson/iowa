"use strict";

var app = app || {};

app.KeyboardController = function(){

	var KeyboardController = function(){
      this.keyActions = [];
      this.keyUpActions = [];
			this.singlePress = [];
			this.keydown = [];
			this.KEYDOWN = 0;
			this.KEYUP = 1;
			this.KEYHOLD = 2;
			this.KEYHYBERNATE = 3;
    };

    var p = KeyboardController.prototype;

    p.init = function(){
      var _this = this;

      window.addEventListener("keypress", function(e){
        if(_this.keydown[e.key] != _this.KEYHOLD || _this.keydown[e.key] == _this.KEYHYBERNATE) {
            _this.keydown[e.key] = _this.KEYDOWN;
          }
      });

      window.addEventListener("keyup", function(e){
          _this.keydown[e.key] = _this.KEYUP;
      });
    };

	p.assignKeyAction = function (keys, action, singlePress = false)
	{
		for(var i = 0; i < keys.length; i++)
		{
			this.keyActions[keys[i]] = action;
			this.keydown[keys[i]] = this.KEYHYBERNATE;
			this.singlePress[keys[i]] = singlePress;
		}
	};

	p.assignKeyUpAction = function (keys, upAction) {

		for(var i = 0; i < keys.length; i++)
		{
			this.keyUpActions[keys[i]] = upAction;
		}
	};

    p.update = function(object){
			for(var key in this.keyActions)
			{
				if(this.keydown[key] == this.KEYDOWN)
				{
					this.keyActions[key](object);

					if(this.singlePress[key]){
						this.keydown[key] = this.KEYHOLD;
					}
				}
				if(this.keydown[key] == this.KEYUP && this.keyUpActions[key] != null)
				{
					this.keyUpActions[key](object);
					this.keydown[key] = this.KEYHYBERNATE;
				}
			}
    };

    return KeyboardController;

}();

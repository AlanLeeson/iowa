"use strict"

var app = app || {};

app.Builder = function () {

    var Builder = function (sprite = null) {
        this.sprite = sprite;
        this.mouselocation = vec2.create();
    };

    var p = Builder.prototype;

    p.assignAsset = function (asset)
    {
        this.sprite = asset;
    };

    p.assignMouseLocation = function (mouse)
    {
        this.mouselocation = mouse;
    };

    p.update = function (dt)
    {

    };

    p.addUpdateListener = function ()
    {

    };

    p.canRemove = function ()
    {
        return false;
    };

    p.render = function (ctx) {
        if (this.sprite != null)
        {
            this.sprite.render(ctx, this.mouselocation);
        }
    };

    return Builder;
}();

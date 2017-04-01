"use strict"

var app = app || {};

app.Builder = function () {

    var Builder = function (image = null) {
        this.image = image;
        this.mouselocation = vec2.create();
    };

    var p = Builder.prototype;

    p.assignAsset = function (asset)
    {
        this.image = asset;
    };

    p.assignMouseLocation = function (mouse)
    {
        this.mouselocation = mouse;
    };

    p.update = function (dt)
    {

    };

    p.render = function (ctx) {
        if (this.image != null)
        {
            ctx.drawImage(this.image, this.mouselocation[0], this.mouselocation[1], 50, 50);
        }
    };

    return Builder;
}();

"use strict";

var app = app || {};

app.UI = function(){

  var UI = function(){
      this.dialogue_box = new app.DialogueBox();
  };

  var p = UI.prototype;

  p.startDialogue = function (text) {
      this.dialogue_box.openDialogue(text);
  }

  p.startTimedDialogue = function (text, time) {
      this.dialogue_box.openDialogue(text);

      var _ui = this;
      setTimeout(function(){
        _ui.dialogue_box.closeDialogue();
      }, time);
  }

  p.stopDialogue = function () {
      this.dialogue_box.closeDialogue();
  }

  return UI;
}();

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

  p.stopDialogue = function () {
      this.dialogue_box.closeDialogue();
  }

  return UI;
}();

"use strict";

var app = app || {};

app.UI = function(){

  var last_time_dialogue = null;

  var UI = function(){
      this.dialogue_box = new app.DialogueBox();
  };

  var p = UI.prototype;

  p.startDialogue = function (text) {
      this.dialogue_box.openDialogue(text);
      this.last_time_dialogue = null;
  }

  p.startTimedDialogue = function (text, time) {
      this.dialogue_box.openDialogue(text);
      this.last_time_dialogue = (+new Date) + time;
  }

  p.stopDialogue = function () {
      this.dialogue_box.closeDialogue();
  }

  p.updateDialogue = function() {
      var now = (+new Date);

      if(this.last_time_dialogue != null && this.last_time_dialogue < now)
      {
        this.stopDialogue();
        this.last_time_dialogue = null;
      }
  }

  return UI;
}();

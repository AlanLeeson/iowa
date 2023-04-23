"use strict";

var app = app || {};

app.UI = function() {

  var UI = function(){
      this.dialogueBox = new app.DialogueBox();
  };

  var p = UI.prototype;

  p.startDialogue = function (text) {
      this.stopDialogue();
      this.dialogueBox.openDialogue(text);
  };

  p.startTimedDialogue = function (text, time) {
      this.dialogueBox.openDialogue(text);
  };

  p.startTypedDialogue = function (text) {
      this.dialogueBox.openAndTypeText(text);
  }

  p.stopDialogue = function () {
      this.dialogueBox.closeDialogue();
  };

  p.updateDialogue = function() {
      var now = (+new Date);

      if(this.dialogueBox.timeTillClose && this.dialogueBox.timeTillClose < now)
      {
        this.stopDialogue();
        this.last_time_dialogue = null;
      }
  };

  return UI;
}();

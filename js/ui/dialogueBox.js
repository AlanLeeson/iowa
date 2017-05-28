"use strict";

var app = app || {};

app.DialogueBox = function(){

  var DialogueBox = function(text, font_col){
      this.text = text;
      this.font_col = font_col;
  };

  var p = DialogueBox.prototype;

  p.openDialogue = function (text) {
      var dialogue_box = document.getElementById("dialogue_box");
      dialogue_box.innerHTML = text;
      dialogue_box.classList.add('opened');
      dialogue_box.classList.remove('closed');
  }

  p.closeDialogue = function () {
      var dialogue_box = document.getElementById("dialogue_box");
      dialogue_box.classList.remove('opened');
      dialogue_box.classList.add('closed');
  }

  return DialogueBox;
}();

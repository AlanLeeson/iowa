"use strict";

var app = app || {};

app.DialogueBox = function(){

  var DialogueBox = function(text, font_col){
      this.text = text;
      this.font_col = font_col;
      this.typeSpeed = 40;
      this.timeTillClose = null;
      this.CLOSE_GRACE_PERIOD = 1000;
  };

  var p = DialogueBox.prototype;

  p.getElement = () => (document.getElementById("dialogueBox"));

  p.openDialogue = function (text) {
      var dialogueBox = this.getElement();
      dialogueBox.innerHTML = text;
      dialogueBox.classList.add('opened');
      dialogueBox.classList.remove('closed');
      this.timeTillClose = (+new Date) + CLOSE_GRACE_PERIOD;
  }

  p.openAndTypeText = function (text) {
      this.getElement().classList.add('opened');
      this.typeText(0, text);
  }

  p.typeText = function (textIndex, text) {
      if (textIndex < text.length) {
          document.getElementById("dialogueBox").innerHTML += text.charAt(textIndex);
          setTimeout(() => {this.typeText(textIndex + 1, text);}, this.typeSpeed);
      } else {
          this.timeTillClose = (+new Date) + this.CLOSE_GRACE_PERIOD;
      }
  }

  p.closeDialogue = function () {
      var dialogueBox = document.getElementById("dialogueBox");
      dialogueBox.innerHTML = "";
      dialogueBox.classList.remove('opened');
      dialogueBox.classList.add('closed');
      this.timeTillClose = null;
  }

  return DialogueBox;
}();

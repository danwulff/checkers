import Ember from 'ember';

export function soundBackground() {
  var sound1 = new Audio('assets/sounds/sound-back1.wav');
  var sound2 = new Audio('assets/sounds/sound-back2.wav');
  var soundArr = [sound1, sound2];

  var x = Math.round(Math.random());
  soundArr[x].loop = true;
  soundArr[x].play();
  soundArr[x].volume = 0.3;

}

export default Ember.Helper.helper(soundBackground);

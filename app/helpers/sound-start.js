import Ember from 'ember';

export function soundStart() {
  var sound = new Audio('assets/sounds/game-start.ogg');
  sound.play();
}

export default Ember.Helper.helper(soundStart);

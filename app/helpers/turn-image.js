import Ember from 'ember';

export function turnImage(params) {
  var turn = params[0];
  var red = params[1];
  var black = params[2];

  if (turn === red) {
    return Ember.String.htmlSafe("<img src='assets/images/circle-red.png' alt='red image'>");
  } else if (turn === black) {
    return Ember.String.htmlSafe("<img src='assets/images/circle-black.png' alt='black image'>");
  }
}

export default Ember.Helper.helper(turnImage);

import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    reset() {
      var game = {
        playerWaiting: '',
        playerRed: 'reset',  //username of red player
        playerBlack: 'reset2',
        turn: '',      //playerRed or PlayerBlack value
        click: '',     //'first' or 'second'
        jumpMove: false,  //false or true
        startPosition: '',  //id of position of checker origin
        gamewinner: 'reset',
        board: [] //array of EVERYTHING
      };

      firebase.database().ref('games/0').set(game);
    }
  }
});

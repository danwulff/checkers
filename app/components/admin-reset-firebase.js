import Ember from 'ember';

export default Ember.Component.extend({


  actions: {
    reset() {
      var temp = [];
      //coordinates of 8x8 board, starting at top right

      //row 0
      temp[0] = {x: 0, y: 0, value: ''}; // '', 'red-reg', 'red-king', 'black-reg', 'black-king'
      temp[1] = {x: 1, y: 0, value: 'black-reg'};
      temp[2] = {x: 2, y: 0, value: ''};
      temp[3] = {x: 3, y: 0, value: 'black-reg'};
      temp[4] = {x: 4, y: 0, value: ''};
      temp[5] = {x: 5, y: 0, value: 'black-reg'};
      temp[6] = {x: 6, y: 0, value: ''};
      temp[7] = {x: 7, y: 0, value: 'black-reg'};
      //row 1
      temp[8] = {x: 0, y: 1, value: 'black-reg'};
      temp[9] = {x: 1, y: 1, value: ''};
      temp[10] = {x: 2, y: 1, value: 'black-reg'};
      temp[11] = {x: 3, y: 1, value: ''};
      temp[12] = {x: 4, y: 1, value: 'black-reg'};
      temp[13] = {x: 5, y: 1, value: ''};
      temp[14] = {x: 6, y: 1, value: 'black-reg'};
      temp[15] = {x: 7, y: 1, value: ''};
      //row 2
      temp[16] = {x: 0, y: 2, value: ''};
      temp[17] = {x: 1, y: 2, value: 'black-reg'};
      temp[18] = {x: 2, y: 2, value: ''};
      temp[19] = {x: 3, y: 2, value: 'black-reg'};
      temp[20] = {x: 4, y: 2, value: ''};
      temp[21] = {x: 5, y: 2, value: 'black-reg'};
      temp[22] = {x: 6, y: 2, value: ''};
      temp[23] = {x: 7, y: 2, value: 'black-reg'};
      //row 3
      temp[24] = {x: 0, y: 3, value: ''};
      temp[25] = {x: 1, y: 3, value: ''};
      temp[26] = {x: 2, y: 3, value: ''};
      temp[27] = {x: 3, y: 3, value: ''};
      temp[28] = {x: 4, y: 3, value: ''};
      temp[29] = {x: 5, y: 3, value: ''};
      temp[30] = {x: 6, y: 3, value: ''};
      temp[31] = {x: 7, y: 3, value: ''};
      //row 4
      temp[32] = {x: 0, y: 4, value: ''};
      temp[33] = {x: 1, y: 4, value: ''};
      temp[34] = {x: 2, y: 4, value: ''};
      temp[35] = {x: 3, y: 4, value: ''};
      temp[36] = {x: 4, y: 4, value: ''};
      temp[37] = {x: 5, y: 4, value: ''};
      temp[38] = {x: 6, y: 4, value: ''};
      temp[39] = {x: 7, y: 4, value: ''};
      //row 5
      temp[40] = {x: 0, y: 5, value: 'red-reg'};
      temp[41] = {x: 1, y: 5, value: ''};
      temp[42] = {x: 2, y: 5, value: 'red-reg'};
      temp[43] = {x: 3, y: 5, value: ''};
      temp[44] = {x: 4, y: 5, value: 'red-reg'};
      temp[45] = {x: 5, y: 5, value: ''};
      temp[46] = {x: 6, y: 5, value: 'red-reg'};
      temp[47] = {x: 7, y: 5, value: ''};
      //row 6
      temp[48] = {x: 0, y: 6, value: ''};
      temp[49] = {x: 1, y: 6, value: 'red-reg'};
      temp[50] = {x: 2, y: 6, value: ''};
      temp[51] = {x: 3, y: 6, value: 'red-reg'};
      temp[52] = {x: 4, y: 6, value: ''};
      temp[53] = {x: 5, y: 6, value: 'red-reg'};
      temp[54] = {x: 6, y: 6, value: ''};
      temp[55] = {x: 7, y: 6, value: 'red-reg'};
      //row 7
      temp[56] = {x: 0, y: 7, value: 'red-reg'};
      temp[57] = {x: 1, y: 7, value: ''};
      temp[58] = {x: 2, y: 7, value: 'red-reg'};
      temp[59] = {x: 3, y: 7, value: ''};
      temp[60] = {x: 4, y: 7, value: 'red-reg'};
      temp[61] = {x: 5, y: 7, value: ''};
      temp[62] = {x: 6, y: 7, value: 'red-reg'};
      temp[63] = {x: 7, y: 7, value: ''};

      var game = {
        playerWaiting: '',
        playerRed: 'reset',  //username of red player
        playerBlack: 'reset2',
        turn: '',      //playerRed or PlayerBlack value
        click: '',     //'first' or 'second'
        jumpMove: false,  //false or true
        startPosition: '',  //id of position of checker origin
        winner: 'reset',
        board: temp   //setup game board
      };

      firebase.database().ref('games/0').set(game);
    }
  }
});

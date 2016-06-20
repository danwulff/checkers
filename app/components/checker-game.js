import Ember from 'ember';

export default Ember.Component.extend({
  game: {
    board: [],
    playerRed: null,
    playerBlack: null,
    turn: null
  },
  actions: {
    setupGame() {
      this.game.playerRed = this.get('playerRed');  //username
      this.game.playerBlack = this.get('playerBlack');  //username
      this.game.turn = 'red';  //'red' or 'black'
      this.game.board = (function() {
        var board = [];
        //coordinates of 8x8 board, starting at top right

        //row 0
        board[0] = {x: 0, y: 0, value: null}; // null, 'red-reg', 'red-king', 'black-reg', 'black-king'
        board[1] = {x: 1, y: 0, value: 'black-reg'};
        board[2] = {x: 2, y: 0, value: null};
        board[3] = {x: 3, y: 0, value: 'black-reg'};
        board[4] = {x: 4, y: 0, value: null};
        board[5] = {x: 5, y: 0, value: 'black-reg'};
        board[6] = {x: 6, y: 0, value: null};
        board[7] = {x: 7, y: 0, value: 'black-reg'};
        //row 1
        board[8] = {x: 0, y: 1, value: 'black-reg'};
        board[9] = {x: 1, y: 1, value: null};
        board[10] = {x: 2, y: 1, value: 'black-reg'};
        board[11] = {x: 3, y: 1, value: null};
        board[12] = {x: 4, y: 1, value: 'black-reg'};
        board[13] = {x: 5, y: 1, value: null};
        board[14] = {x: 6, y: 1, value: 'black-reg'};
        board[15] = {x: 7, y: 1, value: null};
        //row 2
        board[16] = {x: 0, y: 2, value: null};
        board[17] = {x: 1, y: 2, value: 'black-reg'};
        board[18] = {x: 2, y: 2, value: null};
        board[19] = {x: 3, y: 2, value: 'black-reg'};
        board[20] = {x: 4, y: 2, value: null};
        board[21] = {x: 5, y: 2, value: 'black-reg'};
        board[22] = {x: 6, y: 2, value: null};
        board[23] = {x: 7, y: 2, value: 'black-reg'};
        //row 3
        board[24] = {x: 0, y: 3, value: null};
        board[25] = {x: 1, y: 3, value: null};
        board[26] = {x: 2, y: 3, value: null};
        board[27] = {x: 3, y: 3, value: null};
        board[28] = {x: 4, y: 3, value: null};
        board[29] = {x: 5, y: 3, value: null};
        board[30] = {x: 6, y: 3, value: null};
        board[31] = {x: 7, y: 3, value: null};
        //row 4
        board[32] = {x: 0, y: 4, value: null};
        board[33] = {x: 1, y: 4, value: null};
        board[34] = {x: 2, y: 4, value: null};
        board[35] = {x: 3, y: 4, value: null};
        board[36] = {x: 4, y: 4, value: null};
        board[37] = {x: 5, y: 4, value: null};
        board[38] = {x: 6, y: 4, value: null};
        board[39] = {x: 7, y: 4, value: null};
        //row 5
        board[40] = {x: 0, y: 5, value: null};
        board[41] = {x: 1, y: 5, value: 'red-reg'};
        board[42] = {x: 2, y: 5, value: null};
        board[43] = {x: 3, y: 5, value: 'red-reg'};
        board[44] = {x: 4, y: 5, value: null};
        board[45] = {x: 5, y: 5, value: 'red-reg'};
        board[46] = {x: 6, y: 5, value: null};
        board[47] = {x: 7, y: 5, value: 'red-reg'};
        //row 6
        board[48] = {x: 0, y: 6, value: null};
        board[49] = {x: 1, y: 6, value: 'red-reg'};
        board[50] = {x: 2, y: 6, value: null};
        board[51] = {x: 3, y: 6, value: 'red-reg'};
        board[52] = {x: 4, y: 6, value: null};
        board[53] = {x: 5, y: 6, value: 'red-reg'};
        board[54] = {x: 6, y: 6, value: null};
        board[55] = {x: 7, y: 6, value: 'red-reg'};
        //row 7
        board[56] = {x: 0, y: 7, value: 'red-reg'};
        board[57] = {x: 1, y: 7, value: null};
        board[58] = {x: 2, y: 7, value: 'red-reg'};
        board[59] = {x: 3, y: 7, value: null};
        board[60] = {x: 4, y: 7, value: 'red-reg'};
        board[61] = {x: 5, y: 7, value: null};
        board[62] = {x: 6, y: 7, value: 'red-reg'};
        board[63] = {x: 7, y: 7, value: null};

        return board;
      })();
      console.log(this.game.board);
    }
  }

});

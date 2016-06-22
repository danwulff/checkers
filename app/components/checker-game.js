import Ember from 'ember';

export default Ember.Component.extend({
  game: {
    board: [],
    playerRed: null,  //username of red player
    playerBlack: null,
    turn: null,
    click: null     //'first' or 'second'
  },
  actions: {
    setupGame() {
      if(this.get('playerRed') === "" || this.get('playerRed') === undefined || this.get('playerBlack') === "" || this.get('playerBlack') === undefined ) {
        alert('please enter player names');
      } else {
        this.game.playerRed = this.get('playerRed');  //username
        this.game.playerBlack = this.get('playerBlack');  //username
        this.set('game.turn', this.game.playerRed);  //set to 'username' of playerRed
        this.game.click = 'first';
        this.game.startPosition = null;
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
          board[40] = {x: 0, y: 5, value: 'red-reg'};
          board[41] = {x: 1, y: 5, value: null};
          board[42] = {x: 2, y: 5, value: 'red-reg'};
          board[43] = {x: 3, y: 5, value: null};
          board[44] = {x: 4, y: 5, value: 'red-reg'};
          board[45] = {x: 5, y: 5, value: null};
          board[46] = {x: 6, y: 5, value: 'red-reg'};
          board[47] = {x: 7, y: 5, value: null};
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

        //setup checker board
        for(var y = 0; y < 8; y++) {
          for (var x = 0; x < 8; x++) {
            var myId = 'x' + x + 'y' + y;
            //if board[xy math]
            if (this.game.board [(x + y*8)].value === 'red-reg') {
              //set image
              Ember.$('#' + myId).append("<img src='assets/images/circle-red.png' class='checker'/>");
            } else if (this.game.board [(x + y*8)].value === 'black-reg') {
              //set image
              Ember.$('#' + myId).append("<img src='assets/images/circle-black.png' class='checker'/>");
            }
          }
        }
        //hide start game input form
        Ember.$('#startGame').hide();
      }
    },
    //End: setupGame()



    // Player Click
    gameClick(id) {
      // Helper functions-------------------------------------------------------

      //change incoming id (from click action) to array value for board
      var IdToIndex = function (id) {
        //x0y0 -> 0, x1y0 -> 1, x0y1 -> 8
        var x = parseInt(id.charAt(1));
        var y = parseInt(id.charAt(3));
        return x + (y*8);
      };

      //coordinates to id
      var coordinatesToId = function (x, y) {
        return "x" + x + "y" + y;
      };

      //check for valid first click (clicked a checker that belongs to current turn)
      var validFirstChecker = function (id, game) {
        var valid = ((game.board[IdToIndex(id)].value === 'red-reg' || game.board[IdToIndex(id)].value === 'red-king') && (game.turn === game.playerRed)) || ((game.board[IdToIndex(id)].value === 'black-reg' || game.board[IdToIndex(id)].value === 'black-king') && (game.turn === game.playerBlack));
        return valid; //true or false
      };

      //"pick up" checker from location, change pointer to indicate "pick up"
      var pickUpChecker = function (id, game) {
        //remove image from grid
        Ember.$('#' + id).html(id); //todo: remove 'id' from html() eventually

        //change pointer to match user turn
        if (game.turn === game.playerRed) {
          Ember.$(".grid").addClass('red-pointer');
        } else {
          Ember.$(".grid").addClass('black-pointer');
        }
      };

      //"place" checker at id location and rever pointer to normal
      var placeChecker = function (id, game) {
        //display checker in new position
        if (game.board[IdToIndex(id)].value === 'red-reg') {
          Ember.$('#' + id).append("<img src='assets/images/circle-red.png' class='checker'/>");
        } else if (game.board[IdToIndex(id)].value === 'black-reg') {
          Ember.$('#' + id).append("<img src='assets/images/circle-black.png' class='checker'/>");
        }
        //cursor back to normal
        //change pointer to match user turn
        if (game.turn === game.playerRed) {
          Ember.$(".grid").removeClass('red-pointer');
        } else {
          Ember.$(".grid").removeClass('black-pointer');
        }
      }

      //check for valid first click (clicked a checker that belongs to current turn)
      var validSecondChecker = function (id, game) {
        var valid = false;

        //if location is next to original && is empty
        if (isNearby(id, game) && game.board[IdToIndex(id)].value === null) {
          valid = true;
        } //else if location is empty and space between contains enemy color

        return valid; //true or false
      };

      var isNearby = function (id, game) {
        var valid = false;
        var startX = parseInt(game.startPosition.charAt(1));
        var startY = parseInt(game.startPosition.charAt(3));
        var newX = parseInt(id.charAt(1));
        var newY = parseInt(id.charAt(3));

        if (game.turn === game.playerRed) {
          //if new (red) is up and left from original
          if (newY === (startY - 1) && newX === (startX - 1)) {
            valid = true;
          } //else if new (red) is up and right from original
          else if (newY === (startY - 1) && newX === (startX + 1)) {
            valid = true;
          }
        } else {
          //if new (red) is up and left from original
          if (newY === (startY + 1) && newX === (startX - 1)) {
            valid = true;
          } //else if new (red) is up and right from original
          else if (newY === (startY + 1) && newX === (startX + 1)) {
            valid = true;
          }
        }
        return valid
      };

      // End: Helper Functions--------------------------------------------------


      // Game Logic-------------------------------------------------------------
      //if game started
      if (this.game.turn !== null) {
        //if first click && valid checker (belongs to user)
        if(this.game.click === 'first' &&  validFirstChecker(id, this.game)) {
          //change pointer
          pickUpChecker(id, this.game);
          //change 'click' to second click
          this.game.click = 'second';
          //save original position
          this.game.startPosition = id;
        }
        //else second click and valid move
        else if (this.game.click === 'second' && validSecondChecker(id, this.game)) {
          //make move
            //change board array
              //new position filled
          this.game.board[IdToIndex(id)].value = this.game.board[IdToIndex(this.game.startPosition)].value;
              //old position null
          this.game.board[IdToIndex(this.game.startPosition)].value = null;

          //place checker at id location and revert pointer to normal
          placeChecker(id, this.game);

          //increment turn && click
          if(this.game.turn === this.game.playerRed) {
            this.set('game.turn', this.game.playerBlack);
          } else {
            this.set('game.turn', this.game.playerRed);
          }
          this.game.click = 'first';
        } else if (this.game.click === 'second' && id === this.game.startPosition){ //if placed back at original position
          //place checker back down
          placeChecker(id, this.game);
          //back to first click status
          this.game.click = 'first';
        } else {
          //don't do anything
        }
      }

      //else
      else {
        //don't do anything, or alert?
      }
      // End: Game Logic--------------------------------------------------------

    }
    // End: Player Click
  }
  //End: actions
});

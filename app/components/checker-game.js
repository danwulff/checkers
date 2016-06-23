import Ember from 'ember';

export default Ember.Component.extend({
  game: {
    playerRed: null,  //username of red player
    playerBlack: null,
    turn: null,      //playerRed or PlayerBlack value
    click: null,     //'first' or 'second'
    jumpMove: null,  //false or true
    startPosition: null,  //id of position of checker origin
    board: [] //array of EVERYTHING
  },
  actions: {
    //setupGame()---------------------------------------------------------------
    setupGame() {
      if(this.get('playerRed') === "" || this.get('playerRed') === undefined || this.get('playerBlack') === "" || this.get('playerBlack') === undefined ) {
        alert('please enter player names');
      } else {
        this.game.playerRed = this.get('playerRed');  //username
        this.game.playerBlack = this.get('playerBlack');  //username
        this.set('game.turn', this.game.playerRed);  //set to 'username' of playerRed
        this.game.click = 'first';
        this.game.jumpMove = false;
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
            } else if (this.game.board [(x + y*8)].value === 'red-king') {
              //set image
              Ember.$('#' + myId).append("<img src='assets/images/king-red.png' class='checker'/>");
            } else if (this.game.board [(x + y*8)].value === 'black-reg') {
              //set image
              Ember.$('#' + myId).append("<img src='assets/images/circle-black.png' class='checker'/>");
            } else if (this.game.board [(x + y*8)].value === 'black-king') {
              //set image
              Ember.$('#' + myId).append("<img src='assets/images/king-black.png' class='checker'/>");
            }
          }
        }
        //hide start game input form
        Ember.$('#startGame').hide();
      }
    },
    //End: setupGame()----------------------------------------------------------



    // Player Click
    gameClick(id) {
      console.log("I clicked something!");
      // Helper functions-------------------------------------------------------

      //change incoming id (from click action) to array value for board
      var idToIndex = function (id) {
        //x0y0 -> 0, x1y0 -> 1, x0y1 -> 8
        var x = parseInt(id.charAt(1));
        var y = parseInt(id.charAt(3));
        return x + (y*8);
      };

      //change incoming coordinates (from click action) to array value for board
      var coordinatesToIndex = function (x, y) {
        //x0y0 -> 0, x1y0 -> 1, x0y1 -> 8
        return x + (y*8);
      };

      var indexToId = function (index) {
        var x = index % 8;
        var y = Math.floor(index / 8);

        return "x" + x + "y" + y;
      };

      var idToTablePrint = function (id) {
        var x = id.charAt(1);
        var y = id.charAt(3);
        return x + "," + y;
      };

      //need to check if red got to y=0 for king
      var idRedKinged = function (id) {
        var valid = false;
        var y = parseInt(id.charAt(3));
        if (y === 0) valid = true;
        return valid;
      };

      //need to check if black got to y=7 for king
      var idBlackKinged = function (id) {
        var valid = false;
        var y = parseInt(id.charAt(3));
        if (y === 7) valid = true;
        return valid;
      };

      //check for valid first click (clicked a checker that belongs to current turn)
      var validFirstChecker = function (id, game) {
        var valid = ((game.board[idToIndex(id)].value === 'red-reg' || game.board[idToIndex(id)].value === 'red-king') && (game.turn === game.playerRed)) || ((game.board[idToIndex(id)].value === 'black-reg' || game.board[idToIndex(id)].value === 'black-king') && (game.turn === game.playerBlack));
        return valid; //true or false
      };

      //"pick up" checker from location, change pointer to indicate "pick up"
      var pickUpChecker = function (id, game) {
        //remove image from grid
        Ember.$('#' + id).html(idToTablePrint(id)); //todo: remove 'id' from html() eventually

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
        if (game.board[idToIndex(id)].value === 'red-reg') {
          Ember.$('#' + id).html(idToTablePrint(id) + "<img src='assets/images/circle-red.png' class='checker'/>");
        } else if (game.board[idToIndex(id)].value === 'red-king') {
          Ember.$('#' + id).html(idToTablePrint(id) + "<img src='assets/images/king-red.png' class='checker'/>");
        } else if (game.board[idToIndex(id)].value === 'black-reg') {
          Ember.$('#' + id).html(idToTablePrint(id) + "<img src='assets/images/circle-black.png' class='checker'/>");
        } else if (game.board[idToIndex(id)].value === 'black-king') {
          Ember.$('#' + id).html(idToTablePrint(id) + "<img src='assets/images/king-black.png' class='checker'/>");
        }
        //cursor back to normal
        //change pointer to match user turn
        if (game.turn === game.playerRed) {
          Ember.$(".grid").removeClass('red-pointer');
        } else {
          Ember.$(".grid").removeClass('black-pointer');
        }
      };

      //"place" placeholder checker at id location and rever pointer to normal
      var placePlaceholder = function (id, game) {
        //delete checker in start position
        Ember.$('#' + game.startPosition).html(idToTablePrint(game.startPosition));

        //display checker in new position
        if (game.board[idToIndex(id)].value === 'red-reg') {
          Ember.$('#' + id).html(idToTablePrint(id) + "<img src='assets/images/circle-red.png' class='checker' style='opacity: 0.5'/>");
        } else if (game.board[idToIndex(id)].value === 'red-king') {
          Ember.$('#' + id).html(idToTablePrint(id) + "<img src='assets/images/king-red.png' class='checker' style='opacity: 0.5'/>");
        } else if (game.board[idToIndex(id)].value === 'black-reg') {
          Ember.$('#' + id).html(idToTablePrint(id) + "<img src='assets/images/circle-black.png' class='checker' style='opacity: 0.5'/>");
        } else if (game.board[idToIndex(id)].value === 'black-king') {
          Ember.$('#' + id).html(idToTablePrint(id) + "<img src='assets/images/king-black.png' class='checker' style='opacity: 0.5'/>");
        }
      };

      //"remove" checker at id location and rever pointer to normal
      var removeEnemyChecker = function (id, game) {
        var enemyIndex = -1;
        var enemyId = "";

        enemyIndex = enemyJumpCalcs(id, game);
        enemyId = indexToId(enemyIndex);

        //remove enemy checker
        Ember.$('#' + enemyId).html(idToTablePrint(enemyId));
      };

      //check for valid first click (clicked a checker that belongs to current turn)
      var validSecondChecker = function (id, game) {
        var valid = false;

        //if location is next to original && is empty
        if (isNearby(id, game) && game.board[idToIndex(id)].value === null) {
          valid = true;
        } //else if location is empty and space between contains enemy color

        return valid; //true or false
      };

      //check for valid jump move
      var validJumpMove = function (id, game) {
        var valid = false;
        //if blank and one over and enemy in between
        if (game.board[idToIndex(id)].value === null && isOneOver(id, game) && isEnemyBetween(id, game)) {
          valid = true;
        }
        return valid;
      };

      var isNearby = function (id, game) {
        var valid = false;
        var startX = parseInt(game.startPosition.charAt(1));
        var startY = parseInt(game.startPosition.charAt(3));
        var newX = parseInt(id.charAt(1));
        var newY = parseInt(id.charAt(3));

        if (game.turn === game.playerRed) {
          if (game.board[idToIndex(game.startPosition)].value === 'red-reg') {
            if (newY === (startY - 1) && newX === (startX - 1)) {
              valid = true;
            } //else if new (red) is up and right from original
            else if (newY === (startY - 1) && newX === (startX + 1)) {
              valid = true;
            }
          } else if (game.board[idToIndex(game.startPosition)].value === 'red-king') {
            if (newY === (startY - 1) && newX === (startX - 1)) {
              valid = true;
            } //else if new (red) is up and right from original
            else if (newY === (startY - 1) && newX === (startX + 1)) {
              valid = true;
            }
            else if (newY === (startY + 1) && newX === (startX - 1)) {
              valid = true;
            }
            else if (newY === (startY + 1) && newX === (startX + 1)) {
              valid = true;
            }
          }
          //if new (red) is up and left from original

        } else { //black turn
          //if new (black) is up and left from original
          if (game.board[idToIndex(game.startPosition)].value === 'black-reg') {
            if (newY === (startY + 1) && newX === (startX - 1)) {
              valid = true;
            } //else if new (black) is up and right from original
            else if (newY === (startY + 1) && newX === (startX + 1)) {
              valid = true;
            }
          } else if (game.board[idToIndex(game.startPosition)].value === 'black-king'){
              if (newY === (startY + 1) && newX === (startX - 1)) {
                valid = true;
              } //else if new (black) is up and right from original
              else if (newY === (startY + 1) && newX === (startX + 1)) {
                valid = true;
              }
              else if (newY === (startY - 1) && newX === (startX + 1)) {
                valid = true;
              }
              else if (newY === (startY - 1) && newX === (startX - 1)) {
                valid = true;
              }
            }
          }
        return valid;
      };

      var isOneOver = function (id, game) {
        var valid = false;
        var startX = parseInt(game.startPosition.charAt(1));
        var startY = parseInt(game.startPosition.charAt(3));
        var newX = parseInt(id.charAt(1));
        var newY = parseInt(id.charAt(3));

        if (game.turn === game.playerRed) {
          if (game.board[idToIndex(game.startPosition)].value === 'red-reg') {
            //if new (red) is up and left from original
            if (newY === (startY - 2) && newX === (startX - 2)) {
              valid = true;
            } //else if new (red) is up and right from original
            else if (newY === (startY - 2) && newX === (startX + 2)) {
              valid = true;
            }
          } else if (game.board[idToIndex(game.startPosition)].value === 'red-king') {
            //if new (red) is up and left from original
            if (newY === (startY - 2) && newX === (startX - 2)) {
              valid = true;
            } //else if new (red) is up and right from original
            else if (newY === (startY - 2) && newX === (startX + 2)) {
              valid = true;
            }
            else if (newY === (startY + 2) && newX === (startX - 2)) {
              valid = true;
            }
            else if (newY === (startY + 2) && newX === (startX + 2)) {
              valid = true;
            }
          }
        } else { //black turn
          if (game.board[idToIndex(game.startPosition)].value === 'black-reg') {
            //if new (black) is up and left from original
            if (newY === (startY + 2) && newX === (startX - 2)) {
              valid = true;
            } //else if new (black) is up and right from original
            else if (newY === (startY + 2) && newX === (startX + 2)) {
              valid = true;
            }
          } else if (game.board[idToIndex(game.startPosition)].value === 'black-king') {
            //if new (black) is up and left from original
            if (newY === (startY + 2) && newX === (startX - 2)) {
              valid = true;
            } //else if new (black) is up and right from original
            else if (newY === (startY + 2) && newX === (startX + 2)) {
              valid = true;
            }
            else if (newY === (startY - 2) && newX === (startX - 2)) {
              valid = true;
            } //else if new (black) is up and right from original
            else if (newY === (startY - 2) && newX === (startX + 2)) {
              valid = true;
            }
          }
        }

        return valid;
      };

      var isEnemyBetween = function (id, game) {
        var valid = false;
        var startX = parseInt(game.startPosition.charAt(1));
        var startY = parseInt(game.startPosition.charAt(3));
        var newX = parseInt(id.charAt(1));
        var newY = parseInt(id.charAt(3));
        var enemyX = (startX + newX) / 2;
        var enemyY = (startY + newY) / 2;
        //check for not null and not current player (enemy)
        if(game.turn === game.playerRed) {
          if (game.board[coordinatesToIndex(enemyX, enemyY)].value !== null && (game.board[coordinatesToIndex(enemyX, enemyY)].value !== 'red-reg' && game.board[coordinatesToIndex(enemyX, enemyY)].value !== 'red-king')) {
            valid = true;
          }
        } else {
          if (game.board[coordinatesToIndex(enemyX, enemyY)].value !== null && (game.board[coordinatesToIndex(enemyX, enemyY)].value !== 'black-reg' && game.board[coordinatesToIndex(enemyX, enemyY)].value !== 'black-king')) {
            valid = true;
          }
        }

        return valid;
      };

      var enemyJumpCalcs = function (id, game) {
        var index = -1;
        var startX = parseInt(game.startPosition.charAt(1));
        var startY = parseInt(game.startPosition.charAt(3));
        var newX = parseInt(id.charAt(1));
        var newY = parseInt(id.charAt(3));
        var enemyX = (startX + newX) / 2;
        var enemyY = (startY + newY) / 2;

        index = coordinatesToIndex(enemyX, enemyY);

        return index;
      };

      // End: Helper Functions--------------------------------------------------

      //sound Effects for game functions
        var newGame = new Audio('../assets/sound-effects/newGame.mp3');
        var move = new Audio('../assets/sound-effects/checker.png');
        var killEnemy = new Audio('assets/sound-effects/enemyKill.mp3');
        var becomeKing = new Audio('assets/sound-effects/king.mp3');
        var playerWin = new Audio('assets/sound-effects/winner.mp3');
      // Game Logic-------------------------------------------------------------
      //if game started
      if (this.game.turn !== null) {
        //if first click && valid checker (belongs to user)
        if(this.game.click === 'first' &&  validFirstChecker(id, this.game)) {
          //change pointer
          pickUpChecker(id, this.game);
           move.play();
          //change 'click' to second click
          this.game.click = 'second';
          //save original position
          this.game.startPosition = id;
        }
        //else second click and valid move (empty spot)
        else if (this.game.click === 'second' && validSecondChecker(id, this.game) && this.game.jumpMove === false) {
          //make move
            //change board array
              //new position filled
        if (this.game.turn === this.game.playerRed && !idRedKinged(id) && this.game.board[idToIndex(this.game.startPosition)].value !== 'red-king') {
          this.game.board[idToIndex(id)].value = 'red-reg';
        }
        else if(this.game.turn === this.game.playerRed && idRedKinged(id) || this.game.board[idToIndex(this.game.startPosition)].value === 'red-king') {
          this.game.board[idToIndex(id)].value = 'red-king';
        }
        else if (this.game.turn === this.game.playerBlack && !idBlackKinged(id) && this.game.board[idToIndex(this.game.startPosition)].value !== 'black-king') {
          this.game.board[idToIndex(id)].value = 'black-reg';
        }
        else if(this.game.turn === this.game.playerBlack && idBlackKinged(id)  || this.game.board[idToIndex(this.game.startPosition)].value === 'black-king') {
          this.game.board[idToIndex(id)].value = 'black-king';
        }
              //old position null
          this.game.board[idToIndex(this.game.startPosition)].value = null;

          //draw grid changes (place checker at id location and revert pointer to normal)
          placeChecker(id, this.game);

          //increment turn && click
          if(this.game.turn === this.game.playerRed) {
            this.set('game.turn', this.game.playerBlack);
          } else {
            this.set('game.turn', this.game.playerRed);
          }
          this.game.click = 'first';
        }
        //else second click and kill move (empty spot & jump over enemy)
        else if (this.game.click === 'second' && validJumpMove(id, this.game)) {
          //make move
            //change board array
              //new positition filled
          if (this.game.turn === this.game.playerRed && !idRedKinged(id) && this.game.board[idToIndex(this.game.startPosition)].value !== 'red-king') {
            this.game.board[idToIndex(id)].value = 'red-reg';
          }
          else if(this.game.turn === this.game.playerRed && idRedKinged(id) || this.game.board[idToIndex(this.game.startPosition)].value === 'red-king') {
            this.game.board[idToIndex(id)].value = 'red-king';
          }
          else if (this.game.turn === this.game.playerBlack && !idBlackKinged(id) && this.game.board[idToIndex(this.game.startPosition)].value !== 'black-king') {
            this.game.board[idToIndex(id)].value = 'black-reg';
          }
          else if(this.game.turn === this.game.playerBlack && idBlackKinged(id)  || this.game.board[idToIndex(this.game.startPosition)].value === 'black-king') {
            this.game.board[idToIndex(id)].value = 'black-king';
          }
              //old position null
          this.game.board[idToIndex(this.game.startPosition)].value = null;
              //enemy position null
          this.game.board[enemyJumpCalcs(id, this.game)].value = null;
          //draw grid changes (placeholder checker as lightly shaded, keep cursor)
          placePlaceholder(id, this.game);
          //draw grid changes (removeEnemyChecker)
          removeEnemyChecker(id, this.game);

          //"jumpMove" to indicate that further logic will be for jump move (can only continue to move this piece, and setting piece back down to where it is will cause turn to increment)
          this.game.jumpMove = true;
          //new start position to indicate where new position is
          this.game.startPosition = id;
          //don't increment click or turn

        }
        //else if second click and not a jump move
        else if (this.game.click === 'second' && id === this.game.startPosition && this.game.jumpMove === false) { //if placed back at original position
          //place checker back down
          placeChecker(id, this.game);
          //back to first click status
          this.game.click = 'first';
        }
        //else if in a jump move and second click
        else if (this.game.click === 'second' && id === this.game.startPosition && this.game.jumpMove === true) { //if placed back at original position and in the middle of a jump move
          //place checker back down
          placeChecker(id, this.game);
          //increment turn && click
          if(this.game.turn === this.game.playerRed) {
            this.set('game.turn', this.game.playerBlack);
          } else {
            this.set('game.turn', this.game.playerRed);
          }
          //back to first click status
          this.game.click = 'first';
          //not a jump move
          this.game.jumpMove = false;

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

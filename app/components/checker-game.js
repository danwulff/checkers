import Ember from 'ember';

export default Ember.Component.extend({
  //Game Data-------------------------------------------------------------------
  game: {
    playerWaiting: null,
    playerRed: null,  //username of red player
    playerBlack: null,
    turn: null,      //playerRed or PlayerBlack value
    click: null,     //'first' or 'second'
    jumpMove: null,  //false or true
    startPosition: null,  //id of position of checker origin
    winner: null,
    board: [] //array of EVERYTHING
  },
  user: null,
  //End: Game Data--------------------------------------------------------------

  //FIREBASE!!!!!---------------------------------------------------------------
  didInsertElement() {
    var self = this;

    //prompt user for name upon page load
    this.user = prompt("Please enter a username");
    if (this.user === '' || this.user === null) {
      alert('You did not enter a username. You will become a spectator.');
      this.user = 'spectator';
    }

    firebase.database().ref('games/0').on('value', function(snapshot) {
      //get game data from firebase
      self.set('game', snapshot.val());

      //if not a spectator and not currently playing
      if (self.user !== 'spectator' && self.user !== self.game.playerRed && self.user !== self.game.playerBlack) {
        //check for a finished game
        if (self.game.winner !== '' && self.game.turn === '') {
          //check to see if another user is waiting, otherwise add username to the playerWaiting list
          if (self.game.playerWaiting !== '' && self.game.playerWaiting !== self.user) {
            alert("another player is waiting... starting a new game");

            self.game.playerRed = self.game.playerWaiting;      //username
            self.game.playerBlack = self.user;  //username
            self.game.playerWaiting = '';
            self.set('game.turn', self.game.playerRed);       //set to 'username' of playerRed
            self.game.click = 'first';        //set to 'first' click
            self.game.jumpMove = false;       //set to not in the middle of a jump move
            self.game.startPosition = '';   //no previous position for checker move
            self.game.winner = '';
            self.game.board = (function() {   //setup game board
              var board = [];
              //coordinates of 8x8 board, starting at top right

              //row 0
              board[0] = {x: 0, y: 0, value: ''}; // '', 'red-reg', 'red-king', 'black-reg', 'black-king'
              board[1] = {x: 1, y: 0, value: 'black-reg'};
              board[2] = {x: 2, y: 0, value: ''};
              board[3] = {x: 3, y: 0, value: 'black-reg'};
              board[4] = {x: 4, y: 0, value: ''};
              board[5] = {x: 5, y: 0, value: 'black-reg'};
              board[6] = {x: 6, y: 0, value: ''};
              board[7] = {x: 7, y: 0, value: 'black-reg'};
              //row 1
              board[8] = {x: 0, y: 1, value: 'black-reg'};
              board[9] = {x: 1, y: 1, value: ''};
              board[10] = {x: 2, y: 1, value: 'black-reg'};
              board[11] = {x: 3, y: 1, value: ''};
              board[12] = {x: 4, y: 1, value: 'black-reg'};
              board[13] = {x: 5, y: 1, value: ''};
              board[14] = {x: 6, y: 1, value: 'black-reg'};
              board[15] = {x: 7, y: 1, value: ''};
              //row 2
              board[16] = {x: 0, y: 2, value: ''};
              board[17] = {x: 1, y: 2, value: 'black-reg'};
              board[18] = {x: 2, y: 2, value: ''};
              board[19] = {x: 3, y: 2, value: 'black-reg'};
              board[20] = {x: 4, y: 2, value: ''};
              board[21] = {x: 5, y: 2, value: 'black-reg'};
              board[22] = {x: 6, y: 2, value: ''};
              board[23] = {x: 7, y: 2, value: 'black-reg'};
              //row 3
              board[24] = {x: 0, y: 3, value: ''};
              board[25] = {x: 1, y: 3, value: ''};
              board[26] = {x: 2, y: 3, value: ''};
              board[27] = {x: 3, y: 3, value: ''};
              board[28] = {x: 4, y: 3, value: ''};
              board[29] = {x: 5, y: 3, value: ''};
              board[30] = {x: 6, y: 3, value: ''};
              board[31] = {x: 7, y: 3, value: ''};
              //row 4
              board[32] = {x: 0, y: 4, value: ''};
              board[33] = {x: 1, y: 4, value: ''};
              board[34] = {x: 2, y: 4, value: ''};
              board[35] = {x: 3, y: 4, value: ''};
              board[36] = {x: 4, y: 4, value: ''};
              board[37] = {x: 5, y: 4, value: ''};
              board[38] = {x: 6, y: 4, value: ''};
              board[39] = {x: 7, y: 4, value: ''};
              //row 5
              board[40] = {x: 0, y: 5, value: 'red-reg'};
              board[41] = {x: 1, y: 5, value: ''};
              board[42] = {x: 2, y: 5, value: 'red-reg'};
              board[43] = {x: 3, y: 5, value: ''};
              board[44] = {x: 4, y: 5, value: 'red-reg'};
              board[45] = {x: 5, y: 5, value: ''};
              board[46] = {x: 6, y: 5, value: 'red-reg'};
              board[47] = {x: 7, y: 5, value: ''};
              //row 6
              board[48] = {x: 0, y: 6, value: ''};
              board[49] = {x: 1, y: 6, value: 'red-reg'};
              board[50] = {x: 2, y: 6, value: ''};
              board[51] = {x: 3, y: 6, value: 'red-reg'};
              board[52] = {x: 4, y: 6, value: ''};
              board[53] = {x: 5, y: 6, value: 'red-reg'};
              board[54] = {x: 6, y: 6, value: ''};
              board[55] = {x: 7, y: 6, value: 'red-reg'};
              //row 7
              board[56] = {x: 0, y: 7, value: 'red-reg'};
              board[57] = {x: 1, y: 7, value: ''};
              board[58] = {x: 2, y: 7, value: 'red-reg'};
              board[59] = {x: 3, y: 7, value: ''};
              board[60] = {x: 4, y: 7, value: 'red-reg'};
              board[61] = {x: 5, y: 7, value: ''};
              board[62] = {x: 6, y: 7, value: 'red-reg'};
              board[63] = {x: 7, y: 7, value: ''};

              return board;
            });

            //print checker board (in template) through full 8x8 grid
            for(var y = 0; y < 8; y++) {
              for (var x = 0; x < 8; x++) {
                var id = 'x' + x + 'y' + y;
                var prettyPrint = id.charAt(1) + "," + id.charAt(3);
                Ember.$('#' + id).html(prettyPrint);
                //if board[xy math] === 'checker', append html
                if (self.game.board[(x + y*8)].value === 'red-reg') {
                  Ember.$('#' + id).append("<img src='assets/images/circle-red.png' class='checker'/>");
                } else if (self.game.board[(x + y*8)].value === 'red-king') {
                  Ember.$('#' + id).append("<img src='assets/images/king-red.png' class='checker'/>");
                } else if (self.game.board[(x + y*8)].value === 'black-reg') {
                  Ember.$('#' + id).append("<img src='assets/images/circle-black.png' class='checker'/>");
                } else if (self.game.board[(x + y*8)].value === 'black-king') {
                  Ember.$('#' + id).append("<img src='assets/images/king-black.png' class='checker'/>");
                }
              }
            }
            //revert winner banner
            // Ember.$('#winner').html("");
            //send data to firebase
            firebase.database().ref('games/0').set(self.game);




          } else {
            //if now players waiting, add yourself to player waiting
            self.game.playerWaiting = self.user;
            //send data to firebase
            firebase.database().ref('games/0').set(self.game);
          }

        } else {
          //a game is in progress
          alert('A game is currently being played. You will become a spectator. Refresh the page when the game is over to join the next game.');
          self.user = 'spectator';
        }
      }


      //to not overwrite opaque tiles when a it's your turn and a jumpMove
      if(!(self.game.click === 'second' && self.game.jumpMove === true)) {
        //function that draws new board
        //print checker board (in template) through full 8x8 grid
        for(var y = 0; y < 8; y++) {
          for (var x = 0; x < 8; x++) {
            var id = 'x' + x + 'y' + y;
            var prettyPrint = id.charAt(1) + "," + id.charAt(3);
            Ember.$('#' + id).html(prettyPrint);
            //if board[xy math] === 'checker', append html
            if (self.game.board[(x + y*8)].value === 'red-reg') {
              Ember.$('#' + id).append("<img src='assets/images/circle-red.png' class='checker'/>");
            } else if (self.game.board[(x + y*8)].value === 'red-king') {
              Ember.$('#' + id).append("<img src='assets/images/king-red.png' class='checker'/>");
            } else if (self.game.board[(x + y*8)].value === 'black-reg') {
              Ember.$('#' + id).append("<img src='assets/images/circle-black.png' class='checker'/>");
            } else if (self.game.board[(x + y*8)].value === 'black-king') {
              Ember.$('#' + id).append("<img src='assets/images/king-black.png' class='checker'/>");
            }
          }
        }
      }

      //checks incoming data for game winner and prints winner shiz
      if (self.game.winner === self.game.playerRed) {
        Ember.$('#winner').html("<h1>" + self.game.playerRed + " is the winner!</h1>");
        Ember.$('#winner').show();
      } else if (self.game.winner === self.game.playerBlack) {
        Ember.$('#winner').html("<h1>" + self.game.playerBlack + " is the winner!</h1>");
        Ember.$('#winner').show();
      } else {
        Ember.$('#winner').html("");
        Ember.$('#winner').hide();
      }

      //shows player waiting status if you are the player watiting
      if (self.user === self.game.playerWaiting) {
        Ember.$('#winner').append("<p>You are in the queue as '" + self.user + "'. A game will start when another user connects.</p>");
      }


    });
  },

  willDestroyElement() {
    firebase.database().ref('games/0').off('value');
  },
  //End: FIREBASE!!!!!----------------------------------------------------------

  //actions
  actions: {
    //button action to concede the game
    concedeGame() {
      //can only access on your own turn
      if(this.user === this.game.turn) {
        if(this.game.turn === this.game.playerBlack) {
          this.game.winner = this.game.playerRed;
          Ember.$('#winner').html("<h1>" +this.game.playerRed + " is the winner!</h1>");
        } else{
          this.game.winner = this.game.playerBlack;
          Ember.$('#winner').html("<h1>" + this.game.playerBlack + " is the winner!</h1>");
        }
        this.set('game.turn', '');
        //send concede to firebase
        firebase.database().ref('games/0').set(this.game);
      }
    },

    // Player Click-------------------------------------------------------------
    gameClick(id) {
      // Helper functions-------------------------------------------------------
      //change incoming id (from click action) to array index value for board
      var idToIndex = function (id) {
        //x0y0 -> 0, x1y0 -> 1, x0y1 -> 8
        var x = parseInt(id.charAt(1));
        var y = parseInt(id.charAt(3));
        return x + (y*8);
      };
      //change incoming coordinates to array index value for board
      var coordinatesToIndex = function (x, y) {
        //x0y0 -> 0, x1y0 -> 1, x0y1 -> 8
        return x + (y*8);
      };
      //change array index value to id in template
      var indexToId = function (index) {
        var x = index % 8;
        var y = Math.floor(index / 8);

        return "x" + x + "y" + y;
      };
      //change id to string printed in grid
      var idToTablePrint = function (id) {
        var x = id.charAt(1);
        var y = id.charAt(3);
        return x + "," + y;
      };
      //need to check if red got to y=0 for king
      var idRedKinged = function (id) {
        var valid = false;
        var y = parseInt(id.charAt(3));
        if (y === 0) {valid = true;}
        return valid;
      };
      //need to check if black got to y=7 for king
      var idBlackKinged = function (id) {
        var valid = false;
        var y = parseInt(id.charAt(3));
        if (y === 7) {valid = true;}
        return valid;
      };
      //check for valid first click (clicked a checker that belongs to current turn)
      var validFirstChecker = function (id, game) {
        var valid = ((game.board[idToIndex(id)].value === 'red-reg' || game.board[idToIndex(id)].value === 'red-king') && (game.turn === game.playerRed)) || ((game.board[idToIndex(id)].value === 'black-reg' || game.board[idToIndex(id)].value === 'black-king') && (game.turn === game.playerBlack));
        return valid;
      };
      //"pick up" checker from location, change cursor to indicate "pick up"
      var pickUpChecker = function (id, game) {
        //remove image from grid
        Ember.$('#' + id).html(idToTablePrint(id));
        //change pointer to match user turn
        if (game.turn === game.playerRed) {
          Ember.$(".grid").addClass('red-pointer');
        } else {
          Ember.$(".grid").addClass('black-pointer');
        }
      };
      //"place" checker at id location and revert pointer to normal
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
        if (game.turn === game.playerRed) {
          Ember.$(".grid").removeClass('red-pointer');
        } else {
          Ember.$(".grid").removeClass('black-pointer');
        }
      };
      //"place" placeholder checker (opacity = 0.5) at id location and revert pointer to normal
      var placePlaceholder = function (id, game) {
        //delete checker in start position
        Ember.$('#' + game.startPosition).html(idToTablePrint(game.startPosition));
        //display placeholder checker in new position
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
      //"remove" checker from enemy location (between old location and new location)
      var removeEnemyChecker = function (id, game) {
        var enemyIndex = -1;
        var enemyId = "";
        //calculate enemy location index and convert to id
        enemyIndex = enemyJumpCalcs(id, game);
        enemyId = indexToId(enemyIndex);
        //remove enemy checker
        Ember.$('#' + enemyId).html(idToTablePrint(enemyId));
      };
      //check for valid second click
      var validCheckerMove = function (id, game) {
        var valid = false;
        //if location is next to original && is empty
        if (isNearby(id, game) && game.board[idToIndex(id)].value === '') {
          valid = true;
        }
        return valid;
      };
      //check for valid jump move
      var validJumpMove = function (id, game) {
        var valid = false;
        //if jump move position is empty and enemy is between
        if (game.board[idToIndex(id)].value === '' && isOneOver(id, game) && isEnemyBetween(id, game)) {
          valid = true;
        }
        return valid;
      };
      //checks to see if possible move is nearby
      var isNearby = function (id, game) {
        var valid = false;
        var startX = parseInt(game.startPosition.charAt(1));
        var startY = parseInt(game.startPosition.charAt(3));
        var newX = parseInt(id.charAt(1));
        var newY = parseInt(id.charAt(3));
        //if playerRed turn
        if (game.turn === game.playerRed) {
          //if a regular checker
          if (game.board[idToIndex(game.startPosition)].value === 'red-reg') {
            if (newY === (startY - 1) && newX === (startX - 1)) {
              valid = true;
            } //else if new (red) is up and right from original
            else if (newY === (startY - 1) && newX === (startX + 1)) {
              valid = true;
            }
          } //if a king checker
          else if (game.board[idToIndex(game.startPosition)].value === 'red-king') {
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
        } //black turn
        else {
          //if a regular checker
          if (game.board[idToIndex(game.startPosition)].value === 'black-reg') {
            //if new (black) is up and left from original
            if (newY === (startY + 1) && newX === (startX - 1)) {
              valid = true;
            } //else if new (black) is up and right from original
            else if (newY === (startY + 1) && newX === (startX + 1)) {
              valid = true;
            }
          } //if a king checker
          else if (game.board[idToIndex(game.startPosition)].value === 'black-king'){
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
      //checks if new position is a proper 'jump' move
      var isOneOver = function (id, game) {
        var valid = false;
        var startX = parseInt(game.startPosition.charAt(1));
        var startY = parseInt(game.startPosition.charAt(3));
        var newX = parseInt(id.charAt(1));
        var newY = parseInt(id.charAt(3));
        //if playerRed turn
        if (game.turn === game.playerRed) {
          if (game.board[idToIndex(game.startPosition)].value === 'red-reg') {
            if (newY === (startY - 2) && newX === (startX - 2)) {
              valid = true;
            } else if (newY === (startY - 2) && newX === (startX + 2)) {
              valid = true;
            }
          } else if (game.board[idToIndex(game.startPosition)].value === 'red-king') {
            if (newY === (startY - 2) && newX === (startX - 2)) {
              valid = true;
            } else if (newY === (startY - 2) && newX === (startX + 2)) {
              valid = true;
            } else if (newY === (startY + 2) && newX === (startX - 2)) {
              valid = true;
            } else if (newY === (startY + 2) && newX === (startX + 2)) {
              valid = true;
            }
          }
        } else { //black turn
          if (game.board[idToIndex(game.startPosition)].value === 'black-reg') {
            if (newY === (startY + 2) && newX === (startX - 2)) {
              valid = true;
            } else if (newY === (startY + 2) && newX === (startX + 2)) {
              valid = true;
            }
          } else if (game.board[idToIndex(game.startPosition)].value === 'black-king') {
            if (newY === (startY + 2) && newX === (startX - 2)) {
              valid = true;
            } else if (newY === (startY + 2) && newX === (startX + 2)) {
              valid = true;
            } else if (newY === (startY - 2) && newX === (startX - 2)) {
              valid = true;
            } else if (newY === (startY - 2) && newX === (startX + 2)) {
              valid = true;
            }
          }
        }
        return valid;
      };
      //is enemy between previous position and new position
      var isEnemyBetween = function (id, game) {
        var valid = false;
        var startX = parseInt(game.startPosition.charAt(1));
        var startY = parseInt(game.startPosition.charAt(3));
        var newX = parseInt(id.charAt(1));
        var newY = parseInt(id.charAt(3));
        var enemyX = (startX + newX) / 2;
        var enemyY = (startY + newY) / 2;
        //if playerRed turn, and enemy spot is not a black checker
        if(game.turn === game.playerRed) {
          if (game.board[coordinatesToIndex(enemyX, enemyY)].value === 'black-reg' || game.board[coordinatesToIndex(enemyX, enemyY)].value === 'black-king') {
            valid = true;
          }
        } else {
          if (game.board[coordinatesToIndex(enemyX, enemyY)].value === 'red-reg' || game.board[coordinatesToIndex(enemyX, enemyY)].value === 'red-king') {
            valid = true;
          }
        }
        return valid;
      };
      //takes previous id, and new id and converts it to an index of board array
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
      //checks for no more checkers on board (for one player)
      var checkWinner = function (game) {
        var playerRed = false;
        var playerBlack = false;
        //print checker board (in template) through full 8x8 grid
        for(var y = 0; y < 8; y++) {
          for (var x = 0; x < 8; x++) {
            var index = x + (8*y);
            if (game.board[index].value === 'red-reg' || game.board[index].value === 'red-king') {
              playerRed = true;
            } else if (game.board[index].value === 'black-reg' || game.board[index].value === 'black-king') {
              playerBlack = true;
            }
          }
        }
        //return winner or null
        if (playerRed === false) {
          return game.playerBlack;
        } else if (playerBlack === false) {
          return game.playerRed;
        } else {
          return null;
        }
      };
      // End: Helper Functions--------------------------------------------------

      // Game Logic-------------------------------------------------------------
      //if game started
      if (this.game.turn !== '') {
        //can only access on your own turn
        if(this.user === this.game.turn) {
          //if first click && valid checker (belongs to user)
          if(this.game.click === 'first' &&  validFirstChecker(id, this.game)) {
            //change pointer
            pickUpChecker(id, this.game);
            //change 'click' to second click
            this.game.click = 'second';
            //save original position
            this.game.startPosition = id;
          }
          //else second click and valid move (empty spot)
          else if (this.game.click === 'second' && validCheckerMove(id, this.game) && this.game.jumpMove === false) {
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
            //old position ''
            this.game.board[idToIndex(this.game.startPosition)].value = '';

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
            //old position ''
            this.game.board[idToIndex(this.game.startPosition)].value = '';
            //enemy position ''
            this.game.board[enemyJumpCalcs(id, this.game)].value = '';
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

          } else { /*don't do anything*/}
          //check winner every click
          var winner = checkWinner(this.game);
          if (winner === this.game.playerRed && this.game.jumpMove === false) {
            this.game.winner = this.game.playerRed;
            Ember.$('#winner').html("<h1>" +this.game.playerRed + " is the winner!</h1>");
            this.set('game.turn', '');
          } else if (winner === this.game.playerBlack && this.game.jumpMove === false) {
            this.game.winner = this.game.playerBlack;
            Ember.$('#winner').html("<h1>" + this.game.playerBlack + " is the winner!</h1>");
            this.set('game.turn', '');
          } else {
            //do nothing if no winner
          }
          //send data to firebase
          firebase.database().ref('games/0').set(this.game);
        }
      }
      // End: Game Logic--------------------------------------------------------
    }
    // End: Player Click--------------------------------------------------------
  }
  //End: actions
});

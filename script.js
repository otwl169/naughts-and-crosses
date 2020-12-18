var canvas = document.getElementById("gameboard"); // NB just found out that this will be null if script tag is above canvas element
var c = canvas.getContext("2d");
c.font = "50px IBM Plex Sans";

var width = canvas.width;
var height = canvas.height;

function Game(){
    this.board = [
        ['', '', ''], // Row 0
        ['', '', ''], // Row 1
        ['', '', ''] // Row 2
    ]
    this.p1 = 'X';
    this.p2 = 'O';
    this.currentTurn = this.p1;

    this.checkMove = function (x, y) {
        // Check if it is in a row
        var row = null;
        for(var i = 0; i < 3; i++){
            if(y > i*height/3 && y < (i+1)*height/3){
                row = i;
            }
        }

        // Check what column it is in
        var column = null;
        for(var i = 0; i < 3; i++){
            if(x > i*width/3 && x < (i+1)*width/3){
                column = i;
            }
        }
        
        // Execute based on whether we clicked in a cell
        if(row != null && column != null){ 

            if(this.board[row][column] == ''){ // If we made a legal move
                this.board[row][column] = (this.currentTurn == this.p1) ? this.p1 : this.p2; // Place token on board
                
                this.boardUpdate(); // Update our display
                this.checkWin(); // Check if a player has won
                this.currentTurn = (this.currentTurn == this.p1) ? this.p2 : this.p1; // Change player
            }
            
        }
    }

    this.checkWin = function () {
        // Win if we have 3 in a row of the same token in a) a row, b) a column, c) a diagonal

        var winner = null;
        // Check win in rows
        for(var i = 0; i < 3; i++){ // Each column
            if(this.board[i][0] == this.board[i][1] && this.board[i][1] == this.board[i][2] && this.board[i][2] != ''){
                winner = this.currentTurn;
            }
        }

        // Check win in columns
        for(var i = 0; i < 3; i++){ // Each column
            if(this.board[0][i] == this.board[1][i] && this.board[1][i] == this.board[2][i] && this.board[2][i] != ''){
                winner = this.currentTurn;
            }
        }

        // Check win in diagonals
        if(this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2] && this.board[2][2] != ''){
            winner = this.currentTurn;
        } else if(this.board[2][0] == this.board[1][1] && this.board[1][1] == this.board[0][2] && this.board[0][2] != ''){
            winner = this.currentTurn;
        }

        if(winner != null){
            alert("WINNER IS: "+winner);
        }
        
    }

    this.drawBlankBoard = function() {
        c.clearRect(0, 0, width, height);
        c.beginPath();

        // Go through the rows
        for(var i = 1; i < 3; i++){
            c.moveTo(0, i*height/3);
            c.lineTo(width, i*height/3);
        }

        // Go through the columns
        for(var i = 1; i < 3; i++){
            c.moveTo(i*width/3, 0);
            c.lineTo(i*width/3, height);
        }

        c.strokeStyle = "black";
        c.stroke()
    }

    this.drawCellContents = function () {
        for(var i = 0; i < 3; i++){ // Each row
            for(var j = 0; j < 3; j++){ // Each column
                var cellValue = this.board[i][j]; // Get the value on the board position

                // Draw text in correct cell    
                var x = width/6 + j*width/3;
                var y = height/6 + i*height/3;
                c.fillText(cellValue, x, y); 

            }
        }
    }

    this.boardUpdate = function() {
        this.drawBlankBoard();
        this.drawCellContents();
    }

}

var game = new Game();
window.addEventListener("mousedown", 
    function (event) {
        console.log("X: "+event.x+", Y: "+event.y);
        game.checkMove(event.x, event.y);
    })

console.log(game.board);
game.boardUpdate();

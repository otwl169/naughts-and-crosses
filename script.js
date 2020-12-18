var canvas = document.getElementById("gameboard"); // NB just found out that this will be null if script tag is above canvas element
var c = canvas.getContext("2d");
c.font = "50px IBM Plex Sans";

var width = canvas.width;
var height = canvas.height;

window.addEventListener("mousedown", 
    function () {
        console.log("Mouse has been clicked!");
    })

function Game(){
    this.board = [
        ['', '', ''], // Row 0
        ['', 'X', ''], // Row 1
        ['', '', ''] // Row 2
    ]
    this.p1 = 'X';
    this.p2 = 'O';
    this.currentTurn = this.p1;

    

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

    this.update = function() {
        this.drawBlankBoard();
        this.drawCellContents();
    }

}

var game = new Game();
console.log(game.board);
game.drawBlankBoard();
game.drawCellContents();

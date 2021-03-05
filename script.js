const screen = document.querySelector(".screen");
const numberButtons = document.querySelectorAll("[data-num]");
const opButtons = document.querySelectorAll("[data-op]");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#decimal");
const negativeButton = document.querySelector("#negative");

const player = function(name, marker) {
    return {name, marker};
}

const game = (function() {
    const grid = [[],[],[]];
    let gameWon = false;
    function init() {
        resetGrid();
    }

    function resetGrid(){
        gameWon = false;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                grid[i][j] = "";
                gameBoard.setBtn(i, j, "");
            }
        }
    };

    const players = [player("Player1", "X"), player("Player2", "O")];
    let currPlr = 1;

    function switchPlr() {
        currPlr = 1-currPlr;
        gameBoard.setDisplay("(" + players[currPlr].marker + ") " + players[currPlr].name + "'s turn");
    }

    function checkWin(x, y) {
        if (grid[x][0] === grid[x][1] && grid[x][1] === grid[x][2]) {
            return true;
        }
        if (grid[0][y] === grid[1][y] && grid[1][y] === grid[2][y]) {
            return true;
        }
        if (grid[1][1] === "") {
            return false
        }
        if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
            return true;
        }
        if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
            return true;
        }
        return false
    }

    function makeMove(x, y) {
        if (grid[x][y] === "" && !gameWon) {
            let plr = players[currPlr]
            grid[x][y] = plr.marker;
            gameBoard.setBtn(x, y, plr.marker);
            if (checkWin(x,y)) {
                gameWon = true;
                gameBoard.setDisplay(plr.name + " (" + plr.marker + ")  has won")
            } else {
                switchPlr();    
            }
        }
    };

    return {init, makeMove, resetGrid};
})();

const gameBoard = (function() {
    const board = document.querySelector(".board");
    const display = document.querySelector(".display");
    const resetBtn = document.querySelector(".reset");
    const grid = [[],[],[]];

    resetBtn.addEventListener('click', function() {
        game.resetGrid();
    });

    function createBtn(x, y) {
        let btn = document.createElement("button");
        btn.classList.add('btn');
        board.appendChild(btn);
        grid[x][y] = btn;
        btn.addEventListener('click', function() {
            game.makeMove(x, y);
        });
    }

    function setBtn(x, y, str){
        grid[x][y].textContent = str;
    }

    function setDisplay(str) {
        display.textContent = str;
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            createBtn(i, j);
        }
    }

    return {setDisplay, setBtn};
})();

game.init();





(function() {
    //specifications
    var numOfRows = 7;
    var numOfCols = 7;

    //matrix functions
    var boardStatus = [];
    function initBoardStatus() {
        boardStatus = [];
        for (var c = 0; c < numOfCols; c++) {
            boardStatus[c] = new Array(numOfRows);
            for (var r = 0; r < numOfRows; r++) {
                boardStatus[c][r] = 0;
            }
        }
    }
    initBoardStatus();

    function getRowAsString(reqRow) {
        var row = "";
        for (var c = 0; c < numOfCols; c++) {
            for (var r = 0; r < numOfRows; r++) {
                if (r === reqRow) {
                    row += boardStatus[c][r];
                }
            }
        }
        return row;
    }

    function getColAsString(reqCol) {
        var col = "";
        for (var c = 0; c < numOfCols; c++) {
            for (var r = 0; r < numOfRows; r++) {
                if (c == reqCol) {
                    col += boardStatus[c][r];
                }
            }
        }
        return col;
    }

    function getDiagonalsAsString(reqRow, reqCol) {
        var r, c;
        console.log(boardStatus);
        var diagLR = "";
        r = reqRow;
        c = reqCol;
        while (r < numOfRows && c < numOfCols) {
            diagLR += boardStatus[c][r];
            r++;
            c++;
        }
        r = reqRow - 1;
        c = reqCol - 1;
        while (r >= 0 && c >= 0) {
            diagLR = boardStatus[c][r] + diagLR;
            r--;
            c--;
        }

        var diagRL = "";
        r = reqRow;
        c = reqCol;
        while (r >= 0 && c < numOfCols) {
            diagRL += boardStatus[c][r];
            r--;
            c++;
        }
        r = reqRow + 1;
        c = reqCol - 1;
        while (r < numOfRows && c >= 0) {
            diagRL = boardStatus[c][r] + diagRL;
            r++;
            c--;
        }
        console.log([diagRL, diagLR]);
        return [diagRL, diagLR];
    }

    //game logic
    var currentPlayer = 1;
    function checkForVictory(r, c) {
        //row
        var row = getRowAsString(r);
        if (row.indexOf(currentPlayer.toString().repeat(4)) !== -1) {
            return true;
        }

        //col
        var col = getColAsString(r);
        if (col.indexOf(currentPlayer.toString().repeat(4)) !== -1) {
            return true;
        }

        //diagonal
        var diags = getDiagonalsAsString(r, c);
        if (diags[0].indexOf(currentPlayer.toString().repeat(4)) !== -1) {
            return true;
        }
        if (diags[1].indexOf(currentPlayer.toString().repeat(4)) !== -1) {
            return true;
        }

        //not there yet
        return false;
    }

    function switchPlayers() {
        if (currentPlayer == 1) {
            currentPlayer = 2;
        } else {
            currentPlayer = 1;
        }
    }

    var gameOverFlag = false;
    function gameOver(winner) {
        setTimeout(function() {
            alert(winner);
            location.reload();
        }, 100);
        gameOverFlag = true;
    }

    //DOM JQuery - board generation
    function drawBoard() {
        $(".slot").remove(); //clear

        for (var c = 0; c < numOfCols; c++) {
            for (var r = 0; r < numOfRows; r++) {
                $("#connect-four").append(
                    "<div " +
                        'class="slot player' +
                        boardStatus[c][r] +
                        " row" +
                        (r + 1) +
                        " col" +
                        (c + 1) +
                        '" style="grid-column:' +
                        (c + 1) +
                        "; grid-row: " +
                        (r + 1) +
                        '" ><div class="hole"></div></div>'
                );
            }
        }
    }
    drawBoard();

    function updateBoard() {
        for (var c = 0; c < numOfCols; c++) {
            for (var r = 0; r < numOfRows; r++) {
                $(".slot.row" + (numOfRows - r) + ".col" + (c + 1))
                    .removeClass("player0")
                    .removeClass("player1")
                    .removeClass("player2")
                    .addClass("player" + boardStatus[c][r]);
            }
        }
    }

    //Event handlers
    $(".slot").on("click", function(e) {
        if (gameOverFlag) {
            return;
        }

        var selectedColumn = $(e.currentTarget).css("grid-column-start") - 1;
        var emptySlotRow = getColAsString(selectedColumn).indexOf("0");
        if (emptySlotRow != -1) {
            boardStatus[selectedColumn][emptySlotRow] = currentPlayer;
            updateBoard();

            if (checkForVictory(emptySlotRow, selectedColumn)) {
                gameOver(currentPlayer);
            }

            switchPlayers();
        }
    });
})();

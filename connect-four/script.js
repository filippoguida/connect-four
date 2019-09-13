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

        return [diagRL, diagLR];
    }

    //game logic
    var currentPlayer = 1;
    function checkForVictory(r, c) {
        //row
        var row = getRowAsString(r);
        if (row.indexOf(currentPlayer.toString().repeat(4)) !== -1) {
            gameOver(currentPlayer);
        }

        //col
        var col = getColAsString(c);
        if (col.indexOf(currentPlayer.toString().repeat(4)) !== -1) {
            gameOver(currentPlayer);
        }

        //diagonal
        var diags = getDiagonalsAsString(r, c);
        if (diags[0].indexOf(currentPlayer.toString().repeat(4)) !== -1) {
            gameOver(currentPlayer);
        }
        if (diags[1].indexOf(currentPlayer.toString().repeat(4)) !== -1) {
            gameOver(currentPlayer);
        }

        //not there yet
    }

    var gameOverFlag = false;
    function gameOver(winner) {
        setTimeout(function() {
            alert(winner);
            location.reload();
        }, 100);
        gameOverFlag = true;
    }

    function move(selectedColumn) {
        var emptySlotRow = getColAsString(selectedColumn).indexOf("0");
        if (emptySlotRow != -1) {
            boardStatus[selectedColumn][emptySlotRow] = currentPlayer;
            updateBoard();
            checkForVictory(emptySlotRow, selectedColumn);
            switchPlayers();
        }
    }

    function switchPlayers() {
        if (currentPlayer === 1) {
            currentPlayer = 2;
            if (player2Robot) {
                nextRobotMove();
            }
        } else {
            currentPlayer = 1;
        }
    }

    //DOM - board generation
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

    //remote AI player - http://kevinalbs.com/connect4/back-end/info.html
    var player2Robot = true;
    function embedBoardStatus() {
        var board_data = "";
        for (var r = numOfRows; r > 0; r--) {
            for (var c = 0; c < numOfCols; c++) {
                board_data += boardStatus[c][r - 1];
            }
        }
        return board_data;
    }

    function nextRobotMove() {
        $.ajax({
            url: "http://kevinalbs.com/connect4/back-end/index.php/getMoves",
            method: "GET",
            data: {
                board_data: embedBoardStatus(),
                player: 2
            },
            success: function(data) {
                data = JSON.parse(data);
                var selectedColumn = Object.values(data).indexOf(
                    Math.max.apply(null, Object.values(data))
                );
                console.log(selectedColumn);
                move(selectedColumn);
            }
        });
    }

    //Real Player - Event handlers
    $(".slot").on("click", function(e) {
        if (gameOverFlag) {
            return;
        }

        if (currentPlayer === 2 && player2Robot) {
            return;
        }

        var selectedColumn = $(e.currentTarget).css("grid-column-start") - 1;
        move(selectedColumn);
    });
})();

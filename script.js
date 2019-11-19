(function() {
    //specifications
    const numOfRows = 7;
    const numOfCols = 7;

    //matrix functions
    let boardStatus = [];
    function initBoardStatus() {
        boardStatus = [];
        for (let c = 0; c < numOfCols; c++) {
            boardStatus[c] = new Array(numOfRows);
            for (let r = 0; r < numOfRows; r++) {
                boardStatus[c][r] = 0;
            }
        }
    }
    initBoardStatus();

    function getRowAsString(reqRow) {
        let row = "";
        for (let c = 0; c < numOfCols; c++) {
            for (let r = 0; r < numOfRows; r++) {
                if (r === reqRow) {
                    row += boardStatus[c][r];
                }
            }
        }
        return row;
    }

    function getColAsString(reqCol) {
        let col = "";
        for (let c = 0; c < numOfCols; c++) {
            for (let r = 0; r < numOfRows; r++) {
                if (c == reqCol) {
                    col += boardStatus[c][r];
                }
            }
        }
        return col;
    }

    function getDiagonalsAsString(reqRow, reqCol) {
        let r, c;
        let diagLR = "";
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
        let diagRL = "";
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
    let currentPlayer = 1;
    function checkForVictory(r, c) {
        let row = getRowAsString(r);
        if (row.indexOf(currentPlayer.toString().repeat(4)) !== -1) {
            gameOver(currentPlayer);
        }
        let col = getColAsString(c);
        if (col.indexOf(currentPlayer.toString().repeat(4)) !== -1) {
            gameOver(currentPlayer);
        }
        let diags = getDiagonalsAsString(r, c);
        if (diags[0].indexOf(currentPlayer.toString().repeat(4)) !== -1) {
            gameOver(currentPlayer);
        }
        if (diags[1].indexOf(currentPlayer.toString().repeat(4)) !== -1) {
            gameOver(currentPlayer);
        }
    }

    let gameOverFlag = false;
    function gameOver(winner) {
        setTimeout(() => {
            $(".game-over-modal").show();
            $(".game-over-modal h1").html("Player " + winner + " Wins!");
        }, 100);
        gameOverFlag = true;
    }

    let movesHistory = [];
    function move(selectedColumn) {
        let emptySlotRow = getColAsString(selectedColumn).indexOf("0");
        if (emptySlotRow != -1) {
            boardStatus[selectedColumn][emptySlotRow] = currentPlayer;
            movesHistory.push(selectedColumn);
            updateBoard();
            checkForVictory(emptySlotRow, selectedColumn);
            switchPlayers();
        }
    }

    async function switchPlayers() {
        if (currentPlayer === 1) {
            currentPlayer = 2;
            await nextRobotMove();
        } else {
            currentPlayer = 1;
        }
    }

    //DOM - board generation
    function drawBoard() {
        $(".slot").remove(); //clear
        for (let c = 0; c < numOfCols; c++) {
            for (let r = 0; r < numOfRows; r++) {
                $("#board").append(
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
        //Real Player - Event handlers
        let player2Robot = true;
        $(".slot").on("click", function(e) {
            if (gameOverFlag) {
                return;
            }
            if (currentPlayer == 2 && player2Robot) {
                return;
            }
            let col = $(e.currentTarget).css("grid-column-start") - 1;
            move(col);
        });
    }
    drawBoard();

    function updateBoard() {
        for (let c = 0; c < numOfCols; c++) {
            for (let r = 0; r < numOfRows; r++) {
                $(".slot.row" + (numOfRows - r) + ".col" + (c + 1))
                    .removeClass("player0")
                    .removeClass("player1")
                    .removeClass("player2")
                    .addClass("player" + boardStatus[c][r]);
            }
        }
    }

    //remote AI player - http://kevinalbs.com/connect4/back-end/info.html
    function embedBoardStatus() {
        let board_data = "";
        for (let r = numOfRows; r > 0; r--) {
            for (let c = 0; c < numOfCols; c++) {
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
                player: currentPlayer
            },
            success: payload => {
                payload = JSON.parse(payload);
                let selectedColumn = Object.values(payload).indexOf(
                    Math.max.apply(null, Object.values(payload))
                );
                move(selectedColumn);
            }
        });
    }

    //start/re-start game
    $(".game-over-modal").hide();
    $(".welcome-modal").on("click", () => $(".welcome-modal").hide());
    $(".game-over-modal").on("click", () => {
        $(".game-over-modal").hide();
        gameOverFlag = false;
        initBoardStatus();
        drawBoard();
    });
})();

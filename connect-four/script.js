(function() {
    var currentPlayer = "player1";
    function switchPlayers() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
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

    function checkForVictory(slotsInCol, slotsInRow) {
        console.log(currentPlayer);
        //vertical
        var slots = slotsInCol;
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count == 4) {
                    return true;
                }
            } else {
                count = 0;
            }
        }

        //horizontal
        slots = slotsInRow;
        count = 0;
        for (var j = 0; j < slots.length; j++) {
            if (slots.eq(j).hasClass(currentPlayer)) {
                count++;
                if (count == 4) {
                    return true;
                }
            } else {
                count = 0;
            }
        }

        //diagonal
        var diagonalVictories = [
            [0, 7, 14, 21],
            [1, 8, 15, 22],
            [2, 9, 16, 23],
            [3, 8, 13, 18],
            [4, 9, 14, 19],
            [5, 10, 15, 20],
            [6, 13, 20, 27],
            [7, 14, 21, 28],
            [8, 15, 22, 29],
            [9, 14, 19, 24],
            [10, 15, 20, 25],
            [11, 16, 21, 26],
            [12, 19, 26, 33],
            [13, 20, 27, 34],
            [14, 21, 28, 35],
            [15, 20, 25, 30],
            [16, 21, 26, 31],
            [17, 22, 27, 32],
            [18, 25, 32, 39],
            [19, 26, 33, 40],
            [20, 27, 34, 41],
            [22, 27, 32, 37],
            [23, 28, 33, 38],
            [21, 26, 31, 36]
        ];


        for (var k = 0; k < diagonalVictories.length; k++) {
            count = 0;
            for (var g = 0; g < diagonalVictories[k].length; g++) {
                var slotIndex = diagonalVictories[k][g];
                if(!$(".slot").eq(slotIndex).hasClass(currentPlayer)) {
                    break;
                }
                count++;
            }
            if(count==4){
                return true;
            }
        }
        return false;
    }

    $(".column").on("click", function(e) {
        if (gameOverFlag) {
            return;
        }

        var foundAnEmptySlot = false;
        var col = $(e.currentTarget);
        var slotsInCol = col.find(".slot");
        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                foundAnEmptySlot = true;
                break;
            }
        }
        if (!foundAnEmptySlot) {
            return;
        }
        slotsInCol.eq(i).addClass(currentPlayer);

        if (
            checkForVictory(col.find(".slot"), $(".row" + i))
        ) {
            gameOver(currentPlayer);
        }

        switchPlayers();
    });

})();

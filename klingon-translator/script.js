(function() {
    function askForNumber() {
        var num = prompt("Please enter a number between 1 and 10");
        if (num >= 1 && num <= 10 && num == parseInt(num)) {
            return num;
        }
        throw new Error("Bad number");
    }

    function translateNumberKlingon() {
        try {
            var num = askForNumber();
            if (num == 1) {
                alert("wa'");
            } else if (num == 2) {
                alert("cha'");
            } else if (num == 3) {
                alert("wej");
            } else if (num == 4) {
                alert("loS");
            } else if (num == 5) {
                alert("vagh");
            } else if (num == 6) {
                alert("jav");
            } else if (num == 7) {
                alert("Soch");
            } else if (num == 8) {
                alert("chorgh");
            } else if (num == 9) {
                alert("Hut");
            } else if (num == 10) {
                alert("maH");
            }
        } catch (Error) {
            alert("Bad number, try again: [0, 10]");
            translateNumberKlingon();
        }
    }
    translateNumberKlingon();
})();

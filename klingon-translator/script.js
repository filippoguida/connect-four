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
                return "wa'";
            } else if (num == 2) {
                return "cha'";
            } else if (num == 3) {
                return "wej";
            } else if (num == 4) {
                return "loS";
            } else if (num == 5) {
                return "vagh";
            } else if (num == 6) {
                return "jav";
            } else if (num == 7) {
                return "Soch";
            } else if (num == 8) {
                return "chorgh";
            } else if (num == 9) {
                return "Hut";
            } else if (num == 10) {
                return "maH";
            }
        } catch (Error) {
            alert("Bad number, try again: [0, 10]");
            return translateNumberKlingon();
        }
    }
    console.log(translateNumberKlingon());
})();

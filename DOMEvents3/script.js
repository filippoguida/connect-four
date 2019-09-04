(function() {
    var box = document.querySelector(".box");

    function getRandomCSSColor() {
        return (
            "rgb(" +
            Math.floor(Math.random() * 254 + 1) +
            "," +
            Math.floor(Math.random() * 254 + 1) +
            "," +
            Math.floor(Math.random() * 254 + 1) +
            ")"
        );
    }
    box.addEventListener("mousedown", function() {
        box.style.backgroundColor = getRandomCSSColor();
    });
    box.addEventListener("mouseup", function() {
        box.style.backgroundColor = getRandomCSSColor();
    });
})();

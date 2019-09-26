window.onload = function() {
    var bigBox = document.querySelector(".big-box"),
        smallBox = document.querySelector(".small-box");

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
    bigBox.addEventListener("click", function() {
        bigBox.style.backgroundColor = getRandomCSSColor();
    });
    smallBox.addEventListener("click", function(e) {
        e.stopPropagation();
        smallBox.style.backgroundColor = getRandomCSSColor();
    });
};

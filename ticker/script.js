(function() {
    function Ticker(tickerQuery) {
        var offset = 0;
        var links = document
            .querySelector(tickerQuery)
            .querySelectorAll(".google-links");

        function step() {
            //Magic trick - Swap 1st object once invisible
            var first = links[0];
            if (Math.abs(offset) > first.offsetWidth + first.offsetLeft) {
                first.parentElement.style.paddingLeft =
                    first.offsetWidth + first.offsetLeft + 5 + "px";
                first.parentElement.appendChild(first);
                links = document
                    .querySelector(tickerQuery)
                    .querySelectorAll(".google-links");
            }
            //Translate links
            for (var i = 0; i < links.length; i++) {
                links[i].style.transform = "translateX(" + offset + "px)";
            }
            offset -= 1;
            window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    }

    window.onload = function() {
        new Ticker(".top");
        new Ticker(".bottom");
    };
})();

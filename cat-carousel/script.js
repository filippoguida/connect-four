(function() {
    var current = 0,
        timeout = 500,
        next;
    var elements = document.querySelectorAll(".carousel-element");
    //set event handler
    function nextFrame() {
        next = (current + 1) % elements.length;
        elements[current].classList.remove("onscreen");
        elements[current].classList.add("offscreen");
        elements[next].classList.add("onscreen");
        current = next;
    }
    //set event listeners
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("transitionend", function(e) {
            if (e.target.classList.contains("offscreen")) {
                e.target.classList.remove("offscreen");
                setTimeout(nextFrame, timeout);
            }
        });
    }
    //start animation on first image
    setTimeout(nextFrame, timeout);
})();

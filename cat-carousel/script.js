(function() {
    var current = 0,
        timeout = 5000,
        inTransition = false,
        timer;

    var elements = document.querySelectorAll(".carousel-element");
    var dots = document.querySelectorAll(".carousel-dot");

    function moveTo(next) {
        if (typeof next == "undefined") {
            next = (current + 1) % elements.length;
        }
        inTransition = true;

        //transition out
        elements[current].classList.remove("onscreen");
        dots[current].classList.remove("on");
        elements[current].classList.add("offscreen");
        //transition in
        elements[next].classList.add("onscreen");
        dots[next].classList.add("on");

        current = next;
    }

    //set event listeners
    for (var i = 0; i < elements.length; i++) {
        //- for transitions
        elements[i].addEventListener("transitionend", function(e) {
            if (e.target.classList.contains("offscreen")) {
                inTransition = false;
                //reset transition
                e.target.classList.remove("offscreen");
                timer = setTimeout(moveTo, timeout);
            }
        });
        //- for dots
        function getClickHandler(i) {
            return function() {
                if (i != current && !inTransition) {
                    clearTimeout(timer);
                    moveTo(i);
                }
            };
        }
        dots[i].addEventListener("click", getClickHandler(i));
    }

    //animation start
    timer = setTimeout(moveTo, timeout);
})();

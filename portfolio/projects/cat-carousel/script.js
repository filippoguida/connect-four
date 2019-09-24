(function() {
    var current = 0,
        timeout = 5000,
        inTransition = false,
        timer;

    var elements = document.querySelectorAll(".carousel-element");
    var dots = document.querySelectorAll(".carousel-dot");

    function move(next) {
        if (typeof next == "undefined") {
            next = (current + 1) % elements.length;
        } else {
            next = next % elements.length;
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
                timer = setTimeout(move, timeout);
            }
        });
        //- for touch swipe
        var swipeDir;
        elements[i].addEventListener("touchstart", function(e) {
            if (!inTransition) {
                clearTimeout(timer);
                if (e.changedTouches[0].pageX > e.target.width / 2) {
                    swipeDir = "right";
                } else {
                    swipeDir = "left";
                }
            }
            e.preventDefault();
        });
        function getHandleSwipe(i) {
            return function() {
                if (swipeDir == "right" && !inTransition) {
                    move(i + 1);
                }
            };
        }
        elements[i].addEventListener("touchend", getHandleSwipe(i));
        //- for dots
        function getClickHandler(i) {
            return function() {
                if (i != current && !inTransition) {
                    clearTimeout(timer);
                    move(i);
                }
            };
        }
        dots[i].addEventListener("click", getClickHandler(i));
    }

    //animation start
    timer = setTimeout(move, timeout);
})();

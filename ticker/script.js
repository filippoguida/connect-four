(function() {
    function Ticker(tickerQuery) {
        //instance variables
        this.animationPlaying = false;
        this.offset = 0;
        this.query = tickerQuery;
        this.container = document.querySelector(this.query);
        this.links = this.container.querySelectorAll(".google-links");
        //set event listeners
        for (var i = 0; i < this.links.length; i++) {
            var self = this;
            this.links[i].addEventListener("mouseover", function() {
                self.stopAnimation();
            });
            this.links[i].addEventListener("mouseout", function() {
                self.startAnimation();
            });
        }
        return this;
    }

    Ticker.prototype.animate = function() {
        //Magic trick - Swap 1st object once invisible
        var first = this.links[0];
        if (Math.abs(this.offset) > first.offsetWidth + first.offsetLeft) {
            first.parentElement.style.paddingLeft =
                first.offsetWidth + first.offsetLeft + 5 + "px";
            first.parentElement.appendChild(first);
            //update link list
            this.links = document
                .querySelector(this.query)
                .querySelectorAll(".google-links");
        }
        //Translate links
        for (var i = 0; i < this.links.length; i++) {
            this.links[i].style.transform = "translateX(" + this.offset + "px)";
        }
        this.offset -= 1;
        //keep going
        if (this.animationPlaying) {
            var self = this;
            this.currentFrame = window.requestAnimationFrame(function() {
                self.animate();
            });
        }
    };

    Ticker.prototype.startAnimation = function() {
        if (!this.animationPlaying) {
            this.animationPlaying = true;
            var self = this;
            this.currentFrame = window.requestAnimationFrame(function() {
                self.animate();
            });
        }
    };

    Ticker.prototype.stopAnimation = function() {
        if (this.animationPlaying) {
            this.animationPlaying = false;
            window.cancelAnimationFrame(this.currentFrame);
        }
    };

    new Ticker(".top").startAnimation();
    new Ticker(".bottom").startAnimation();
})();

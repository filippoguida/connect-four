(function() {
    function Ticker(tickerQuery) {
        this.query = tickerQuery;
        this.links = $(this.query + " .google-links");

        this.animationStatus = "stop";
        this.offset = 0;

        for (var i = 0; i < this.links.length; i++) {
            var self = this;
            this.links.eq(i).on("mouseover", function() {
                self.pauseAnimation();
            });
            this.links.eq(i).on("mouseout", function() {
                self.resumeAnimation();
            });
        }
    }

    Ticker.prototype.animate = function() {
        if (this.animationStatus == "playing") {
            //swap hidden elements
            var first = this.links.eq(0);
            var firstSize = Math.floor(
                first.width() + 2 * parseInt(first.css("padding-left"))
            );
            if (Math.abs(this.offset) >= firstSize) {
                console.log(firstSize);
                this.offset = 4;
                first.parent().append(first);
                //update link list
                this.links = $(this.query + " .google-links");
            }

            //translate links
            for (var i = 0; i < this.links.length; i++) {
                this.links.eq(i).css({
                    transform: "translateX(" + this.offset + "px)"
                });
            }
            this.offset -= 1;

            //call next frame
            var self = this;
            this.currentFrame = requestAnimationFrame(function() {
                self.animate();
            });
        }
    };

    Ticker.prototype.startAnimation = function() {
        this.animationStatus = "playing";
        var self = this;
        this.currentFrame = requestAnimationFrame(function() {
            self.animate();
        });
    };

    Ticker.prototype.pauseAnimation = function() {
        if (this.animationStatus == "playing") {
            this.animationStatus = "paused";
            cancelAnimationFrame(this.currentFrame);
        }
    };

    Ticker.prototype.resumeAnimation = function() {
        if (this.animationStatus == "paused") {
            this.startAnimation();
        }
    };

    new Ticker(".top").startAnimation();
    new Ticker(".bottom").startAnimation();
})();

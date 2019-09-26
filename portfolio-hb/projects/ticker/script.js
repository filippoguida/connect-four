(function() {
    function Ticker(container, links) {
        this.container = container;
        this.animationStatus = "stop";
        this.offset = 0;

        var self = this; //when are we going to use lambda functions :( ?
        links.forEach(function(link) {
            console.log(link);
            var anchor = $("<a href=" + link.url + ">" + link.text + "</a>");
            anchor
                .on("mouseover", function() {
                    self.pauseAnimation();
                })
                .on("mouseout", function() {
                    self.resumeAnimation();
                });
            container.append(anchor);
        });
    }

    Ticker.prototype.animate = function() {
        if (this.animationStatus == "playing") {
            //swap hidden elements
            var first = $(this.container)
                    .children()
                    .eq(0),
                firstSize = Math.floor(
                    first.width() + 2 * parseInt(first.css("padding-left"))
                );
            if (Math.abs(this.offset) >= firstSize) {
                this.offset = 4;
                this.container.append(first);
            }

            //translate links
            this.container.children().css({
                transform: "translateX(" + this.offset + "px)"
            });
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

    $.ajax({
        url: "http://localhost:8080/links.json",
        method: "GET",
        data: {
            limit: 20
        },
        success: function(objects) {
            new Ticker($(".top"), objects[0].links).startAnimation();
            new Ticker($(".bottom"), objects[1].links).startAnimation();
        }
    });
})();

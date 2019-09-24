(function() {
    var slider = $(".slider");
    var topImage = $(".top-image");

    var isDragging = false;
    slider
        .parent()
        .on("mousedown", function(e) {
            e.preventDefault();
            if (!isDragging) {
                isDragging = true;
                slider.css({ cursor: "grabbing" });
            }
        })
        .on("mouseup", function() {
            if (isDragging) {
                isDragging = false;
                slider.css({ cursor: "grab" });
            }

            topImage.width(slider.position().left);
        })
        .on("mousemove", function(e) {
            if (isDragging) {
                if (slider.position().left < 0) {
                    slider.css({ left: 0 });
                    isDragging = false;
                    slider.css({ cursor: "grab" });
                    return;
                }

                if (slider.position().left > $(".container").width()) {
                    slider.css({ left: 590 });
                    isDragging = false;
                    slider.css({ cursor: "grab" });
                    return;
                }

                slider.offset({
                    left: e.pageX
                });
                topImage.width(slider.position().left);
            }
        });
    topImage.width(slider.position().left);
})();

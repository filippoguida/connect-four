(function() {
    function getResults() {
        $("#results").empty();

        var txt = $("#country")
            .val()
            .toLowerCase();

        if (txt) {
            $.ajax({
                url: "https://flame-egg.glitch.me/",
                data: {
                    q: txt
                },
                success: function(countries) {
                    var test = countries[0].toLowerCase();
                    if (txt && test && test.indexOf(txt) === 0) {
                        var limit = false;
                        for (var i = 0; i < countries.length && !limit; i++) {
                            $("#results").append(
                                '<p class="result">' + countries[i] + "</p>"
                            );
                        }

                        if ($(".result").length === 4) {
                            limit = true; //show max 4 countries
                        }

                        if ($(".result").length === 0) {
                            $("#results").append(
                                '<p class="result">no countries</p>'
                            );
                        } else {
                            $(".result")
                                .on("mouseover", function(e) {
                                    $(".result").removeClass("highlight");
                                    $(e.target).addClass("highlight");
                                })
                                .on("mousedown", function(e) {
                                    $("#country").val($(e.target).text());
                                    $("#results").empty();
                                });
                        }
                    }
                }
            });
        }
    }

    $("#country")
        .on("input", getResults)
        .on("focus", getResults)
        .on("keydown", function(e) {
            var sel = $(".result.highlight");

            if (e.keyCode === 40) {
                if (sel.length === 0) {
                    $(".result")
                        .eq(0)
                        .addClass("highlight");
                } else if (sel.next().length !== 0) {
                    sel.removeClass("highlight");
                    sel.next().addClass("highlight");
                }
            } else if (e.keyCode === 38 && sel.prev().length !== 0) {
                sel.removeClass("highlight");
                sel.prev().addClass("highlight");
            } else if (e.keyCode === 13 && sel.length !== 0) {
                $("#country").val(sel.text());
                $("#results").empty();
            }
        })
        .on("click", function(e) {
            e.stopPropagation();
        });

    $(window).click(function() {
        $("#results").empty();
    });
})();

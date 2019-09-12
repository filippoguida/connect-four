(function() {
    var ajaxTimeout;

    //-
    $("#country")
        .on("input", textareaHandler)
        .on("focus", textareaHandler)
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
        .on("blur", function() {
            $("#results").empty();
        });

    //-
    function textareaHandler() {
        var txt = $("#country")
            .val()
            .toLowerCase();
        if (!txt) {
            $("#results").empty();
            return;
        }
        ajaxTimeout = setTimeout(function() {
            getResults(txt);
        }, 250);
    }

    function getResults(txt) {
        $.ajax({
            url: "https://flame-egg.glitch.me/",
            data: {
                q: txt
            },
            success: function(countries) {
                if (countries.length === 0) {
                    $("#results").empty();
                    return;
                }
                var test = countries[0].toLowerCase();
                if (!test) {
                    return;
                }
                if (test.indexOf(txt) === 0) {
                    domOperations(countries);
                }
            }
        });
    }

    function domOperations(countries) {
        $("#results").empty();

        var limit = false;
        for (var i = 0; i < countries.length && !limit; i++) {
            $("#results").append('<p class="result">' + countries[i] + "</p>");
        }

        if ($(".result").length === 4) {
            limit = true; //show max 4 countries
        }

        if ($(".result").length === 0) {
            $("#results").append('<p class="result">no countries</p>');
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
})();

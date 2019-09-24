(function() {
    //-Handlebars Compiler Call
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll(
        'script[type="text/x-handlebars-template"]'
    );

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });

    //-Spotify search
    var url = "https://elegant-croissant.glitch.me/spotify";
    var page = 0;
    var hasNext;

    function spotifySearch(q, type, offset = 0, limit = 20) {
        $.ajax(url, {
            data: {
                q: q,
                type: type,
                offset: offset,
                limit: limit
            },
            success: function(data) {
                type = type.toLowerCase() + "s"; //one S to rule them all
                appendResults(data, type);
                if (data[type].next) {
                    hasNext = true;
                } else {
                    hasNext = false;
                }
            }
        });
    }

    var tempData = { items: [] };
    function appendResults(data, type) {
        tempData.items = tempData.items.concat(
            data[type].items.filter(function(obj) {
                return obj.images.length != 0;
            })
        );
        $("#results-spotify").html(Handlebars.templates.result(tempData));
    }

    //- Click Handlers
    $("#searchbutton").on("click", function() {
        $("#resultsfor")
            .empty()
            .append("Results for: " + $("#searchbar").val());
        tempData.items = [];
        spotifySearch($("#searchbar").val(), $("#searchtype").val());
    });

    $("#searchbar").on("keydown", function(e) {
        if (e.keyCode === 13) {
            $("#resultsfor")
                .empty()
                .append("Results for: " + $("#searchbar").val());
            $("#results").empty();
            tempData.items = [];
            spotifySearch($("#searchbar").val(), $("#searchtype").val());
        }
    });

    //- Scroll Handler - Debounce Strategy
    if (document.URL.indexOf("scroll=infinite") != -1) {
        var timerId;
        function scrollHandler() {
            if (hasNext) {
                var scrollHeight = $(document).height();
                var scrollPosition = $(window).height() + $(window).scrollTop();
                if (Math.floor(scrollHeight - scrollPosition) === 0) {
                    //search for next results
                    page++;
                    spotifySearch(
                        $("#searchbar").val(),
                        $("#searchtype").val(),
                        page * 20
                    );
                }
            }
        }

        function dScrollHandler(delay, fn) {
            if (timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(fn, delay);
        }

        $(window).on("scroll", function() {
            dScrollHandler(500, scrollHandler);
        });
    }
})();

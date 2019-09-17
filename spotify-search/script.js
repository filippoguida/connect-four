(function() {
    //-Spootify search
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
                appendResults(data.artists.items);
                if (data.artists.next) {
                    hasNext = true;
                } else {
                    hasNext = false;
                }
            }
        });
    }

    function appendResults(results) {
        for (var i = 0; i < results.length; i++) {
            if (results[i].images[0]) {
                $("#results").append(
                    '<div class="result">' +
                        '<img src="' +
                        results[i].images[0].url +
                        '"/>' +
                        "<p>" +
                        results[i].name +
                        "</p>" +
                        "</div>"
                );
            }
        }
    }

    //- Click Handlers
    $("#searchbutton").on("click", function() {
        $("#resultsfor")
            .empty()
            .append("Results for: " + $("#searchbar").val());
        $("#results").empty();
        spotifySearch($("#searchbar").val(), $("#searchtype").val());
    });

    $("#searchbar").on("keydown", function(e) {
        if (e.keyCode === 13) {
            $("#resultsfor")
                .empty()
                .append("Results for: " + $("#searchbar").val());
            $("#results").empty();
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
                if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
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

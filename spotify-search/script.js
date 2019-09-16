(function() {
    //-Spootify search
    var url = "https://elegant-croissant.glitch.me/spotify";
    var page = 0;

    function spotifySearch(q, type, offset = 0, limit = 20) {
        $.ajax(url, {
            data: {
                q: q,
                type: type,
                offset: offset,
                limit: limit
            },
            success: function(payload) {
                appendResults(payload.artists.items);
                if (payload.artists.next) {
                    page++;
                } else {
                    page = null;
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

    //-
    $("#searchbutton").on("click", function() {
        $("#resultsfor")
            .empty()
            .append("Results for: " + $("#searchbar").val());
        $("#results").empty();
        spotifySearch($("#searchbar").val(), $("#searchtype").val());
    });

    $("#searchbar").on("keydown", function(e) {
        $("#resultsfor")
            .empty()
            .append("Results for: " + $("#searchbar").val());
        $("#results").empty();
        spotifySearch($("#searchbar").val(), $("#searchtype").val());
    });

    $(window).on("scroll", function() {
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
            if (page) {
                spotifySearch(
                    $("#searchbar").val(),
                    $("#searchtype").val(),
                    page * 20
                );
            }
        }
    });
})();

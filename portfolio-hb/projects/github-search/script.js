(function() {
    //- Custom events - lag managment
    new Event("lastajaxreceived");

    //- html pre compiler
    Handlebars.templates = Handlebars.templates || {};
    var repoTemplate = (Handlebars.templates.repos = Handlebars.compile(
        $("#repo").html()
    ));
    function renderHtml() {
        $("#results-container").html(repoTemplate({ repos: repos }));
    }
    $("#results-container").on("lastajaxreceived", renderHtml);

    //- GitHub API
    var baseUrl = "https://api.github.com";
    var repos;

    function getRepos(username, password, userToSearch) {
        var endPoint = "/users/" + userToSearch + "/repos";
        $.ajax({
            url: baseUrl + endPoint,
            headers: {
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            success: function(data) {
                repos = data;
                repos.forEach((repo, i) => {
                    let isLast = i == repos.length - 1;
                    getCommits(username, password, repo, isLast);
                });
            },
            error: errorMessages
        });
    }

    function getCommits(username, password, repo, isLast = false) {
        var endPoint = "/repos/" + repo.full_name + "/commits";
        $.ajax({
            url: baseUrl + endPoint,
            headers: {
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            success: function(data) {
                repo.commits = data;
                if (isLast) {
                    $("#results-container").trigger("lastajaxreceived");
                }
            },
            error: errorMessages
        });
    }

    function errorMessages(err) {
        if (err.status === 401) {
            alert("wrong username/password");
        } else if (err.status === 404) {
            alert("resource not found");
        } else {
            alert("communication error");
        }
    }

    //- Event Handlers
    $("#btn").on("click", function() {
        getRepos(
            $('input[name="username"]').val(),
            $('input[name="password"]').val(),
            $('input[name="user-to-search"]').val()
        );
    });

    $(document).on("click", ".repo", function(e) {
        var ul = $(e.currentTarget).find("ul");

        if (ul.hasClass("hidden")) {
            ul.removeClass("hidden");
            ul.show();
        } else {
            ul.hide();
            ul.addClass("hidden");
        }
    });
})();

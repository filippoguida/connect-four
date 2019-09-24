(function() {
    //Handlebars Compiler Call
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll(
        'script[type="text/x-handlebars-template"]'
    );

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });
    ///////////////////////////////////////////////////////////////////////////
    $.ajax({
        dataType: "json",
        url: "authors.json",
        success: function(data) {
            $(".authors-info").html(Handlebars.templates.authors(data));
        }
    });
})();

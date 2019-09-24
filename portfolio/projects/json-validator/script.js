(function() {
    var json = document.getElementById("json");
    var btn = document.getElementById("validate");

    btn.addEventListener("click", function() {
        try {
            JSON.parse(json.value);
        } catch (e) {
            alert("JSON validation failed");
            return;
        }

        alert("JSON validation succeded");
    });
})();

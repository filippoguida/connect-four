(function() {
    var txt = document.getElementById("txt");
    txt.addEventListener("input", function() {
        window.localStorage.setItem("txt", txt.value);
    });

    var btn = document.getElementById("clear");
    btn.addEventListener("click", function() {
        window.localStorage.removeItem("txt");
    });

    try {
        txt.value = window.localStorage.getItem("txt", txt.value);
    } catch (e) {
        console.log(e);
    }
})();

(function() {
    var txt = document.getElementById("txt");
    txt.addEventListener("input", function() {
        try {
            window.localStorage.setItem("txt", txt.value);
        } catch (e) {
            console.log(e);
        }
    });

    var btn = document.getElementById("clear");
    btn.addEventListener("click", function() {
        try {
            window.localStorage.removeItem("txt");
        } catch (e) {
            console.log(e);
        }
    });

    try {
        txt.value = window.localStorage.getItem("txt", txt.value);
    } catch (e) {
        console.log(e);
    }
})();

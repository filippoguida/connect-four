window.onload = function() {
    var box = document.querySelector(".box");
    var visible = false;
    document.addEventListener("mousemove", function(e) {
        //move box
        box.parentElement.style.top = e.clientY - 50 + "px";
        box.parentElement.style.left = e.clientX - 50 + "px";
        //make it visible
        if (!visible) {
            box.parentElement.classList.add("box-pulse");
            box.classList.add("box-in");
            visible = true;
        }
    });
};

//Ex 1
function empathize(selector) {
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.fontWeight = "bold";
        elements[i].style.fontStyle = "italic";
        elements[i].style.textDecoration = "underline";
    }
}
empathize("p");

//-
//Ex 2
function getElementsByClassName(className) {
    var elements = [];
    function walkHtmlTree(node) {
        if (node.classList) {
            if (node.classList.contains(className)) {
                elements.push(node);
            }
        }
        if (node.hasChildNodes()) {
            for (var i = 0; i < node.childNodes.length; i++) {
                walkHtmlTree(node.childNodes[i]);
            }
        }
    }
    walkHtmlTree(document.body);
    return elements;
}
getElementsByClassName("notes");

//-
//Ex 3
function makeItAwesome() {
    var p = document.createElement("P");
    p.style.position = "fixed";
    p.style.zIndex = "2147483647";
    p.style.left = "20px";
    p.style.top = "100px";
    p.style.fontSize = "200px";
    p.innerHTML = "AWESOME";

    document.body.appendChild(p);
}
makeItAwesome();

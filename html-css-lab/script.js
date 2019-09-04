//(function() {
var menuIn = document.querySelector(".menu");
var menuOut = document.querySelector(".menu-x");
var navbar = document.querySelector("nav");

menuIn.addEventListener("click", function() {
    console.log("clicked");
    navbar.classList.remove("menu-out");
    navbar.classList.add("menu-in");
});

menuOut.addEventListener("click", function() {
    navbar.classList.remove("menu-in");
    navbar.classList.add("menu-out");
});
//})();

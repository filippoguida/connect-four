const express = require("express");
const hb = require("express-handlebars");
const app = express();

//Serve contents
app.use("/projects", express.static(__dirname + "/projects"));
app.use("/public", express.static(__dirname + "/public"));

//HB setup
app.engine("handlebars", hb());
app.set("view engine", "handlebars");

//Renderer
app.get("/", (req, res) => {
    res.render("welcome", {
        layout: "layout",
        title: "Portfolio HB Welcome Page",
        projects: require("./projects.json")
    });
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

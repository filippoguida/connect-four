const contents = require("./Contents.js");
const express = require("express");
var app = express();

app.get("/", (req, res) => {
    contents.getListHTML(html => res.send(html));
});

app.use(express.static(__dirname + "/projects"));
app.use((req, res, next) => {
    contents.get(req.url, content => res.send(content));
    next();
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

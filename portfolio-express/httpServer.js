const contents = require("./Contents.js");
const express = require("express");
const cookieParser = require("cookie-parser");

var app = express();
app.use(cookieParser());
app.use(express.static(__dirname + "/projects"));

app.use(
    express.urlencoded({
        extended: false
    })
);

app.get("/", (req, res) => {
    if (req.cookies.auth) {
        contents.getListHTML(html => res.send(html));
    } else {
        res.send(`
            <p>Do you want some cookie? 🍪</p>
            <form method="POST">
                <input type="checkbox" name="auth">Yes, please!
                <button>submit</button>
            </form>
        `);
    }
});

app.post("/", (req, res) => {
    console.log(req.body);
    if (req.body.auth) {
        res.cookie("auth", "true");
    }
    res.redirect("/");
});

app.use((req, res, next) => {
    if (req.cookies.auth) {
        contents.get(req.url, content => res.send(content));
    } else {
        res.redirect("/");
    }
    next();
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

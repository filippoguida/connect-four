const fs = require("fs");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();


//Serve contents
app.use(express.static(__dirname + "/projects"));

//Cookie
app.use(cookieParser());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.get("/", (req, res) => {
    if (req.cookies.agreed) {
        let body = "<ul>";
        fs.readdir(__dirname + "/projects", f => {
            console.log(f.name);
            body += `<li><a href="/projects/${f.name}">${f.name}</a></li>`;
        });
        body += "</ul>";
        return res.send(body);
    } else {
        res.send(`
            <p>Do you want some cookie? 🍪</p>
            <form method="POST">
                <input type="checkbox" name="agreed">Yes, please!
                <button>submit</button>
            </form>
        `);
    }
});
app.post("/", (req, res) => {
    console.log(req.body);
    if (req.body.agreed) {
        res.cookie("agreed", "true");
    }
    res.redirect("/");
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

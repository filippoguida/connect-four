const twitter = require("./twitter.js");
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/ticker"));

app.get("/links.json", (req, res) => {
    twitter.getToken((err, token) => {
        if (!err) {
            twitter.getTweets(token, "theonion", (err, tweets) => {
                if (!err) {
                    res.statusCode = 200;
                    res.json(tweets);
                } else {
                    console.log(err);
                    res.statusCode = 500;
                    res.end();
                }
            });
        } else {
            console.log(err);
            res.statusCode = 500;
            res.end();
        }
    });
});

app.listen(8080, console.log("Server listening on port 8080"));

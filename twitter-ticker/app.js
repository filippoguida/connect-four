const twitter = require("./twitter.js");
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/ticker"));

app.get("/links.json", (req, res) => {
    twitter
        .getToken()
        .then(token => {
            Promise.all([
                twitter.getTweets(token, "bbcworld"),
                twitter.getTweets(token, "nytimes"),
                twitter.getTweets(token, "forbes")
            ])
                .then(results => {
                    let tweets = [];
                    for (let result of results) {
                        tweets.push(...result);
                    }
                    tweets = tweets.sort((a, b) => {
                        return new Date(b.created_at) - new Date(a.created_at);
                    });
                    console.log(tweets);
                    res.json(tweets);
                })
                .catch(err => res.sendCode(err));
        })
        .catch(err => res.sendCode(err));
});

app.listen(8080, console.log("Server listening on port 8080"));

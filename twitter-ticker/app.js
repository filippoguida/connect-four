const fs = require("fs");
const twitter = require("./twitter.js");
const express = require("express");
const app = express();

app.use("/", express.static(__dirname + "/ticker"));

app.get("/ticker/links.json", () => {
    twitter.getToken((err, token) => {
        if (!err) {
            console.log("?");
            twitter.getTweets(token, "theonion", (err, tweets) => {
                if (!err) {
                    let tickerLinks = [];
                    for (let tweet of tweets) {
                        try {
                            let url = tweet.entities.urls[0].url;
                            let text = tweet.text;
                            tickerLinks.push({ text, url });
                        } catch (err) {
                            console.log(
                                "Tweet " + tweet.id + " skipped. No URL."
                            );
                        }
                    }
                    fs.writeFile(
                        "./ticker/links.json",
                        JSON.stringify(tickerLinks, null, "\t"),
                        "utf8",
                        err => console.log(err)
                    );
                } else console.log("error");
            });
        } else console.log(err);
    });
});

app.listen(8080, console.log("Server listening on port 8080"));

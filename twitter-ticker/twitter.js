const https = require("https");
const { consumerKey, consumerSecret } = require("./secret.json");
const secret64 = Buffer.from(
    encodeURIComponent(consumerKey) + ":" + encodeURIComponent(consumerSecret)
).toString("base64");

module.exports.getToken = function() {
    return new Promise(function(resolve, reject) {
        const req = https.request(
            {
                method: "POST",
                host: "api.twitter.com",
                path: "/oauth2/token",
                headers: {
                    Authorization: `Basic ${secret64}`,
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8"
                }
            },
            res => {
                let body = "";
                res.on("data", chunk => (body += chunk));
                res.on("end", () => {
                    if (res.statusCode !== 200) reject(res.statusCode);
                    else resolve(JSON.parse(body));
                });
            }
        );
        req.end("grant_type=client_credentials");
    });
};

module.exports.getTweets = (token, user_id) => {
    return new Promise(function(resolve, reject) {
        const req = https.request(
            {
                method: "GET",
                host: "api.twitter.com",
                path:
                    "/1.1/statuses/user_timeline.json?count=100&screen_name=" +
                    user_id,
                headers: {
                    Authorization: `Bearer ${token.access_token}`
                }
            },
            res => {
                let body = "";
                res.on("data", chunk => (body += chunk));
                res.on("end", () => {
                    let tweets = JSON.parse(body);
                    if (res.statusCode !== 200) reject(res.statusCode);
                    else resolve(filterTweets(tweets));
                });
            }
        );
        req.end();
    });
};

function filterTweets(tweets) {
    let filteredTweets = [];
    for (let tweet of tweets) {
        try {
            let text = tweet.text;
            for (let media of tweet.entities.media) {
                text = text.replace(media.url, "");
            }
            for (let link of tweet.entities.urls) {
                text = text.replace(link.url, "");
            }
            let url = tweet.entities.urls[0].url;
            filteredTweets.push({ text, url });
        } catch (err) {
            //fail silently
        }
    }
    return filteredTweets;
}

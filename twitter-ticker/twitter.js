const request = require("./request");

const { consumerKey, consumerSecret } = require("./secret.json");
const secret64 = Buffer.from(
    encodeURIComponent(consumerKey) + ":" + encodeURIComponent(consumerSecret)
).toString("base64");

function getToken() {
    return request({
        method: "POST",
        host: "api.twitter.com",
        path: "/oauth2/token",
        auth: `Basic ${secret64}`,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        body: "grant_type=client_credentials"
    }).then(function(data) {
        return JSON.parse(data).access_token;
    });
}

function getTweets(token, user_id) {
    return request({
        method: "GET",
        host: "api.twitter.com",
        path:
            "/1.1/statuses/user_timeline.json?count=100&screen_name=" + user_id,
        auth: `Bearer ${token}`
    }).then(function(data) {
        return JSON.parse(data);
    });
}

module.exports.getTweets = function(feeds) {
    return getToken().then(token => {
        if (!Array.isArray(feeds)) {
            return getTweets(token, feeds);
        }
        return Promise.all(feeds.map(feed => getTweets(token, feed))).then(
            feedsResults => {
                let tweets = [];
                for (let feedTweets of feedsResults) {
                    tweets.push(...feedTweets);
                }
                tweets = tweets.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                });
                return tweets;
            }
        );
    });
};

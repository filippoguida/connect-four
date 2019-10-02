const twitter = require("./twitter");

module.exports = function(feeds) {
    return twitter.getTweets(feeds).then(tweets => {
        return filterTweets(tweets);
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

const process = require("process");
const url = require("url");
const querystring = require("querystring");

const parsedUrl = url.parse(process.argv[2]);

Object.keys(parsedUrl).forEach(key => {
    console.log("The", key, "is", parsedUrl[key]);
});

const parsedQuery = querystring.parse(parsedUrl.query);
if (parsedQuery) {
    Object.keys(parsedQuery).forEach(key => {
        console.log("The value of the", key, " parameter is", parsedQuery[key]);
    });
}

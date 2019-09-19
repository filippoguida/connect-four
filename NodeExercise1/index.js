const process = require("process");
const url = require("url");
const querystring = require("querystring");

const parsedUrl = url.parse(process.argv[2]);

console.log("protocol is", parsedUrl.protocol);
console.log("The host is", parsedUrl.host);
console.log("The hostname is", parsedUrl.hostname);
console.log("The port is", parsedUrl.port);
console.log("The pathname is", parsedUrl.pathname);
console.log("The query is", parsedUrl.query);

const parsedQuery = querystring.parse(parsedUrl.query);
if (parsedQuery) {
    Object.keys(parsedQuery).forEach(key => {
        console.log("The value of the", key, " parameter is", parsedQuery[key]);
    });
}

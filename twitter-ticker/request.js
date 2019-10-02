const http = require("http");
const https = require("https");

module.exports = options =>
    new Promise(function(resolve, reject) {
        const headers = {};
        if (options.auth) {
            headers.authorization = options.auth;
        }
        if (options.contentType) {
            headers["content-type"] = options.contentType;
        }
        const req = (options.protocol == "http" ? http : https).request(
            {
                method: options.method || "GET",
                host: options.host,
                path: options.path,
                headers: headers
            },
            function(resp) {
                if (resp.statusCode != 200) {
                    return reject(resp.statusCode);
                }
                let data = "";
                resp.on("data", function(chunk) {
                    data += chunk;
                }).on("end", function() {
                    resolve(data);
                });
            }
        );
        req.on("error", reject);
        options.body && req.write(options.body);
        req.end();
    });

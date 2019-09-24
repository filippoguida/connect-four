const http = require("http");
const fs = require("fs");
const contents = require("./Contents.js");

http.createServer((req, res) => {
    const { method, url } = req;

    res.on("error", err => console.log(err.stack));

    req.on("error", () => {
        //Bad Requests
        res.statusCode = 404;
        res.end();
    });

    if (method != "GET") {
        //method not allowed
        res.statusCode = 405;
        res.end();
    } else {
        const content = contents.get(url);
        if (content.err) {
            if (content.err == "Forbidden") {
                res.statusCode = 403;
                return res.end();
            } else if (content.err == "Not Found") {
                res.statusCode = 404;
                return res.end();
            }
        } else {
            fs.createReadStream(content.path)
                .on("error", () => {
                    //Internal Server Error
                    res.statusCode = 500;
                    res.end();
                })
                .pipe(res);
        }
    }
}).listen(8080, () => console.log("Server is listening on port 8080"));

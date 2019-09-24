const fs = require("fs");
const http = require("http");

http.createServer((request, response) => {
    const { headers, method, url } = request;
    console.log({ headers, method, url });

    response.on("error", err => console.log(err.stack));

    let body = [];
    request
        .on("error", err => console.log(err.stack))
        .on("data", chunk => body.push(chunk))
        .on("end", () => {
            if (method === "HEAD") handleHead(response);
            else if (method === "GET") handleGet(request, response);
            else if (method === "POST") handlePost(request, response, body);
            else handleOther(response);
        });
}).listen(8080);

function handleHead(response) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end();
}

function handleGet(request, response) {
    const { url } = request;
    if (url.indexOf("/requests.txt") != -1) {
        response.setHeader("Content-Type", "text/plain");
        fs.createReadStream("./requests.txt").pipe(response);
    } else {
        const { headers, method, url } = request;
        logTxt(headers, method, url);
        let body =
            "<!doctype html><html><title>Hello World!</title><p>Hello World!</html>";
        response.end(body);
    }
}

function handlePost(request, response, body) {
    console.log(Buffer.concat(body).toString());
    response.statusCode = 302;
    response.setHeader("Location", "/");
    response.end();
}

function handleOther(response) {
    response.statusCode = 405;
    response.end();
}

function logTxt(headers, method, url) {
    fs.appendFile(
        "requests.txt",
        `${new Date()}\t${method}\t${url}\t${headers["user-agent"]}\n`,
        () => console.log("New acces to requests.txt")
    );
}

const fs = require("fs");
const http = require("http");
const querystring = require("querystring");
const chalk = require("chalk");

http.createServer((request, response) => {
    const { headers, method, url } = request;
    console.log({ headers, method, url });

    response.on("error", err => console.log(err.stack));

    let body = "";
    request
        .on("error", err => console.log(err.stack))
        .on("data", chunk => (body += chunk))
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
        let html = `<!doctype html>
                    <html>
                    <title>Colors</title>
                    <form method="POST">
                      <input type="text" name="text">
                      <select name="color">
                        <option value="red">red</option>
                        <option value="blue">blue</option>
                        <option value="green">green</option>
                        <option value="yellow">yellow</option>
                        <option value="gray">gray</option>
                        <option value="magenta">magenta</option>
                        <option value="cyan">cyan</option>
                      </select>
                      <button type="submit">Go</button>
                    </form>
                    </html>`;
        response.end(html);
    }
}

function handlePost(request, response, body) {
    let data = querystring.parse(body);
    console.log(data);
    console.log(chalk[data.color](data.text));
    let html = `<!doctype html>
                <html>
                    <title>${data.text}</title>
                    <a href="/" style="color:${data.color}">${data.text}</a>
                </html>`;
    response.end(html);
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

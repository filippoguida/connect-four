const fs = require("fs");
const path = require("path");
const contentsDir = path.normalize(`${__dirname}/projects`);

exports.init = function() {
    const contentTypes = JSON.parse(
        fs.readFileSync(`${__dirname}/contentTypes.json`)
    );

    function getContentType(file) {
        return (
            contentTypes[
                path
                    .extname(file.name)
                    .toLowerCase()
                    .replace(".", "")
            ] || "application/octet-stream"
        );
    }

    let contents = {};
    function mapContentsSync(dirPath, isSubDirectory = false) {
        fs.readdirSync(dirPath, {
            withFileTypes: true
        }).forEach(file => {
            if (file.isFile()) {
                const fileUrl = `${dirPath.replace(contentsDir, "")}/${
                    file.name
                }`;
                contents[fileUrl] = {
                    path: `${dirPath}/${file.name}`,
                    type: getContentType(file),
                    isProjectFolder: false
                };
            } else if (file.isDirectory() && !isSubDirectory) {
                const fileUrl = `/${file.name}`;
                contents[fileUrl] = {
                    path: `${dirPath}/${file.name}/index.html`,
                    type: "text/html",
                    isProjectFolder: true,
                    projectName: file.name
                };
                mapContentsSync(`${dirPath}/${file.name}`, true);
            } else if (file.isDirectory() && isSubDirectory) {
                mapContentsSync(`${dirPath}/${file.name}`, true);
            }
        });
    }

    function updateContentsSync() {
        mapContentsSync(contentsDir);
        fs.writeFileSync(
            `${__dirname}/contents.json`,
            JSON.stringify(contents, null, "\t")
        );
    }

    updateContentsSync();
    fs.watch(contentsDir).on("change", () => {
        updateContentsSync();
    });
};

exports.get = function(url, callback) {
    fs.readFile(`${__dirname}/contents.json`, (err, data) => {
        if (!err) {
            const contents = JSON.parse(data);
            const content = contents[url];
            if (!content) {
                const contentPath = path.normalize(`${contentsDir}${url}`);
                if (!contentPath.startsWith(contentsDir)) {
                    callback({
                        err: "Forbidden"
                    });
                } else {
                    callback({
                        err: "Not Found"
                    });
                }
            } else {
                callback(content);
            }
        }
    });
};

exports.getListHTML = function(callback) {
    fs.readFile(`${__dirname}/contents.json`, (err, data) => {
        var body = "<html><ul>";
        if (!err) {
            const contents = JSON.parse(data);
            Object.keys(contents).forEach(url => {
                let content = contents[url];
                if (content.isProjectFolder) {
                    body += `<li><a href="${url}/index.html">${content.projectName}</a></li>`;
                }
            });
        }
        body += "</ul></html>";
        callback(body);
    });
};

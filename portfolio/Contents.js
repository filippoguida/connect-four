const fs = require("fs");
const path = require("path");
const contentTypes = require(`${__dirname}/contentTypes.json`);
const contentsDir = path.normalize(`${__dirname}/projects`);

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

function mapContentsSync(dirPath, obj) {
    let map = obj || {};
    fs.readdirSync(dirPath, {
        withFileTypes: true
    }).forEach(file => {
        if (file.isFile()) {
            const fileUrl = `${dirPath.replace(contentsDir, "")}/${file.name}`;
            map[fileUrl] = {
                path: `${dirPath}/${file.name}`,
                contentType: getContentType(file)
            };
        } else if (file.isDirectory()) {
            const fileUrl = `/${file.name}`;
            map[fileUrl] = {
                path: `${file.name}/index.html`,
                contentType: "text/html"
            };
            mapContentsSync(`${dirPath}/${file.name}`, map);
        }
    });
    return map;
}

let contents = mapContentsSync(contentsDir);
exports.get = function(url) {
    const content = contents[url];
    if (!content) {
        const contentPath = path.normalize(`${contentsDir}${url}`);
        if (!contentPath.startsWith(contentsDir)) {
            return {
                err: "Forbidden",
                statusCode: 403
            };
        } else {
            if (!fs.existsSync(contentPath)) {
                console.log(contentPath);
                return {
                    err: "Not Found",
                    statusCode: 404
                };
            } else {
                // TODO: find better way to update files
                contents = mapContentsSync(contentPath, contents);
                exports.get(url);
            }
        }
    } else {
        return content;
    }
};

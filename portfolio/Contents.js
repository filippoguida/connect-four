const fs = require("fs");
const path = require("path");
const contentTypes = require(`${__dirname}/contentTypes.json`);
const contentsDir = path.normalize(`${__dirname}/projects`);

let contents = mapContentsSync(contentsDir);
function mapContentsSync(dirPath, obj) {
    let map = obj || {};
    fs.readdirSync(dirPath, {
        withFileTypes: true
    }).forEach(file => {
        if (file.isFile()) {
            const fileUrl = `${dirPath.replace(contentsDir, "")}/${file.name}`;
            map[fileUrl] = {
                path: `${dirPath}/${file.name}`,
                contentType: getContentType(file),
                isProjectFolder: false
            };
        } else if (file.isDirectory()) {
            const fileUrl = `/${file.name}`;
            map[fileUrl] = {
                path: `${dirPath}/${file.name}/index.html`,
                contentType: "text/html",
                isProjectFolder: true,
                projectName: file.name
            };
            mapContentsSync(`${dirPath}/${file.name}`, map);
        }
    });
    return map;
}
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

const contentsWatcher = fs.watch(contentsDir);
contentsWatcher.on("change", () => {
    console.log("changed");
    contents = mapContentsSync(contentsDir);
});

exports.get = function(url) {
    const content = contents[url];
    if (!content) {
        const contentPath = path.normalize(`${contentsDir}${url}`);
        if (!contentPath.startsWith(contentsDir)) {
            return {
                err: "Forbidden"
            };
        } else {
            return {
                err: "Not Found"
            };
        }
    } else {
        return content;
    }
};

exports.getListHTML = function() {
    var body = "<html><ul>";
    Object.keys(contents).forEach(url => {
        let content = contents[url];
        if (content.isProjectFolder) {
            body += `<li><a href="${url}">${content.projectName}</a></li>`;
        }
    });
    body += "</ul></html>";
    return body;
};

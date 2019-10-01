const fs = require("fs");

function readdir(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, { withFileTypes: true }, (err, files) => {
            if (err) reject(err);
            else resolve(files);
        });
    });
}

function stat(file, path) {
    return new Promise((resolve, reject) => {
        fs.stat(`${path}/${file.name}`, (err, s) => {
            if (err) reject(err);
            else resolve(s);
        });
    });
}

let promises = [];
function logSizes(path) {
    promises.push(
        readdir(path).then(files => {
            for (let file of files) {
                if (file.isFile()) {
                    promises.push(
                        stat(file, path).then(s =>
                            console.log(`${path}/${file.name}: ${s.size}`)
                        )
                    );
                } else if (file.isDirectory()) {
                    promises.push(logSizes(`${path}/${file.name}`));
                }
            }
        })
    );
}
logSizes("C:/Users/Filippo Guida/Desktop/coriander-code");
Promise.all(promises);

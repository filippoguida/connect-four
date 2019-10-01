const fs = require("fs");
const util = require("util");

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

function logSizes(path) {
    readdir(path, {
        withFileTypes: true
    })
        .then(files => {
            for (let f of files) {
                if (f.isFile()) {
                    stat(`${path}/${f.name}`)
                        .then(s => console.log(`${path}/${f.name}: ${s.size}`))
                        .catch(err => console.log(err));
                } else if (f.isDirectory()) {
                    logSizes(`${path}/${f.name}`);
                }
            }
        })
        .catch(err => console.log(err));
}
logSizes("C:/Users/Filippo Guida/Desktop/coriander-code");

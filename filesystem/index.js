const fs = require("fs");

//- EX 1
function logSizes(path) {
    fs.readdir(
        path,
        {
            withFileTypes: true
        },
        (err, files) => {
            if (err) {
                console.log(err);
                return;
            } else {
                for (let f of files) {
                    if (f.isFile()) {
                        fs.stat(`${path}/${f.name}`, (err, s) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(`${path}/${f.name}: ${s.size}`);
                            }
                        });
                    } else if (f.isDirectory()) {
                        logSizes(`${path}/${f.name}`);
                    }
                }
            }
        }
    );
}
// logSizes("C:/Users/Filippo Guida/Desktop/coriander-code");

//- EX 2
let dirMap = {};
function mapSizes(path, obj) {
    let files = fs.readdirSync(path, {
        withFileTypes: true
    });

    if (files) {
        for (let f of files) {
            if (f.isFile()) {
                let s = fs.statSync(`${path}/${f.name}`);
                if (s) {
                    obj[f.name] = s;
                }
            }
            if (f.isDirectory()) {
                obj[f.name] = {};
                mapSizes(`${path}/${f.name}`, obj[f.name]);
            }
        }
    }
}

mapSizes("C:/Users/Filippo Guida/Desktop/coriander-code", dirMap);
fs.writeFileSync(
    "C:/Users/Filippo Guida/Desktop/coriander-code/filesystem/map.txt",
    JSON.stringify(dirMap, null, 4)
);

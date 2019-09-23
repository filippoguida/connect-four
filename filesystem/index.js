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
logSizes("C:/Users/Filippo Guida/Desktop/coriander-code");

//- EX 2
function mapSizes(path, obj) {
    let map = obj || {};
    let files = fs.readdirSync(path, {
        withFileTypes: true
    });
    for (let f of files) {
        if (f.isFile()) {
            let s = fs.statSync(`${path}/${f.name}`);
            map[f.name] = s.size;
        } else if (f.isDirectory()) {
            map[f.name] = {};
            mapSizes(`${path}/${f.name}`, map[f.name]);
        }
    }
    return map;
}

fs.writeFileSync(
    "C:/Users/Filippo Guida/Desktop/coriander-code/filesystem/map.txt",
    JSON.stringify(
        mapSizes("C:/Users/Filippo Guida/Desktop/coriander-code"),
        null,
        4
    )
);

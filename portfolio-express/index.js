const cluster = require("cluster");
const os = require("os");
const contents = require("./Contents.js");
contents.init();

cluster.setupMaster({
    exec: __dirname + "/httpServer.js"
});

for (let i = 0, l = os.cpus().length; i < l; i++) {
    cluster.fork();
}

cluster.on("exit", function(worker) {
    console.log(worker.process.pid + " bit the dust");
    cluster.fork();
});

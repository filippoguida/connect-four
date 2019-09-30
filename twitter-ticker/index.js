const os = require("os");
const cluster = require("cluster");

//Server instances
cluster.setupMaster({
    exec: __dirname + "/app.js"
});

for (let i = 0, l = os.cpus().length; i < l; i++) {
    cluster.fork();
}

cluster.on("exit", function(worker) {
    console.log(worker.process.pid + " bit the dust");
    cluster.fork();
});

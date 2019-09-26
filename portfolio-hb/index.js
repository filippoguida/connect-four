const fs = require("fs");
const os = require("os");
const cluster = require("cluster");

//Content manager
const projectDir = `${__dirname}/projects`;
function collectProjects() {
    var projects = [];
    fs.readdirSync(projectDir).forEach(project => {
        projects.push({
            title: project,
            directory: `projects/${project}`
        });
    });
    fs.writeFileSync(
        `${__dirname}/projects.json`,
        JSON.stringify(projects, null, "\t")
    );
}

collectProjects();
fs.watch(projectDir).on("change", () => {
    collectProjects();
});

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

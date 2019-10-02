const headlines = require("./headlines");
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/ticker"));

app.get("/links.json", (req, res) => {
    headlines(["bbcworld", "nytimes", "forbes"])
        .then(headlines => res.json(headlines))
        .catch(err => res.sendStatus(err));
});

app.listen(8080, console.log("Server listening on port 8080"));

const http = require("http");
const fs = require("fs").promises;

function indexPageRequest(req, res) {
  fs.readFile(__dirname + "/index.html")
    .then((contents) => {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(contents);
    })
    .catch((err) => {
      res.writeHead(500);
      res.end(err);
      return;
    });
}

const games = JSON.stringify([
  { name: "Doom Ethernal" },
  { name: "Rim World" },
  { name: "Crusader Kings 3" }
]);

//create a server object:
http
  .createServer((req, res) => {
    switch (req.url) {
      case "/games":
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        setTimeout(() => res.end(games), 301000);
        break;
      default:
        indexPageRequest(req, res);
    }
  })
  .listen(8080); //the server object listens on port 8080

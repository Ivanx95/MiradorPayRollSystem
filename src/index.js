
const express = require("express");
const app = express();
const port = 8000;
const uuidv1 = require("uuid/v1");
const request = require("request");

const bodyParser = require("body-parser");

const apiRouter = require("./api.js");

const allowedDomains = ["http://localhost:3000"];



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.set("view engine", "pug");
app.set("views", "./views");


app.use("/api",apiRouter);

app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });

  console.log("allowing cors to ");
  next();
});

app.use(function(err, req, res, next) {
  console.error("Error handled");
  res.status(500).send({
    error: "Error",
    msg: err.message,
    date: new Date().valueOf(),
    uuid: uuidv1()
  });
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});


app.get("*", function(req, res) {
  res.render("404");
});

app.listen(port, () => console.log(`example app on port ${port}`));
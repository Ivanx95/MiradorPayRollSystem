
const express = require("express");
const app = express();
const port = 8000;
const uuidv1 = require("uuid/v1");
const request = require("request");

const bodyParser = require("body-parser");

const apiRouter = require("./api.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");


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

app.use("/api",apiRouter);

app.get("*", function(req, res) {
  res.render("404");
});

app.listen(port, () => console.log(`example app on port ${port}`));
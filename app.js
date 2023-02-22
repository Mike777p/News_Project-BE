const express = require("express");
const app = express();
const getTopics = require("./controllers/topics.controller")
const getArticles = require("./controllers/articleController")
const { handle500Status, handle404PathNotFound } = require("./controllers/ErrorHandlers");



app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.use(handle404PathNotFound);

app.use(handle500Status);

module.exports = app
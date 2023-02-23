const express = require("express");
const app = express();
const getTopics = require("./controllers/topics.controller");
const {
  getArticles,
  getArticleByID,
} = require("./controllers/articleController");
const  { getCommentByArticleID } = require("./controllers/commentController")
const {
  handle500Status,
  handle404PathNotFound,
  handle400StatusBadRequest,
} = require("./controllers/ErrorHandlers");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:id", getArticleByID);

app.get("/api/articles/:id/comments", getCommentByArticleID);

app.use(handle404PathNotFound);

app.use(handle400StatusBadRequest);

app.use(handle500Status);

module.exports = app;

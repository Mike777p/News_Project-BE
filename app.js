const express = require("express");
const app = express();
const getTopics = require("./controllers/topics.controller");
const {
  getArticles,
  getArticleById,
  postCommentByArticleId,
  patchArticleById,
} = require("./controllers/articleController");
const { getCommentByArticleId,  deleteCommentById } = require("./controllers/commentController");
const { getUsers } = require("./controllers/userController");
const {
  handle500Status,
  handle404PathNotFound,
  handle400StatusBadRequest,
} = require("./controllers/ErrorHandlers");
const cors = require("cors");

app.use(express.json(), cors());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:id", getArticleById);

app.get("/api/articles/:id/comments", getCommentByArticleId);

app.post("/api/articles/:id/comments", postCommentByArticleId);

app.patch("/api/articles/:article_id", patchArticleById);

app.delete("/api/comments/:comment_id", deleteCommentById)

app.use(handle404PathNotFound);

app.use(handle400StatusBadRequest);

app.use(handle500Status);

module.exports = app;

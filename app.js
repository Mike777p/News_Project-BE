const express = require("express");
const app = express();
const getTopics = require("./controllers/topics.controller")
const { handle500Status } = require("./controllers/ErrorHandlers")

app.use(express.json());

app.get("/api/topics", getTopics);

app.use(handle500Status);

module.exports = app
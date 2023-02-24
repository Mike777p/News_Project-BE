const {
  fetchCommentCounts,
  fetchArticleByID,
  fetchPostComment,
} = require("../models.js/articleModel");

const getArticles = (request, response, next) => {
  return fetchCommentCounts().then((data) => {
    finishedData = data.map((obj) => {
      const { comment_count } = obj;
      return { ...obj, comment_count: parseInt(comment_count) };
    });
    response.status(200).send({ articles: finishedData });
  });
};

const getArticleByID = (request, response, next) => {
  const { id } = request.params;
  return fetchArticleByID(id).then((data) => {
    if (data.length > 0) {
      const articleByID = { article: data[0] };
      response.status(200).send(articleByID);
    } else {
      response.status(404).send({ msg: "Not found" });
    }
  });
};

const postCommentByArticleID = (request, response, next) => {
  const { id } = request.params;
  const { username, body } = request.body;
  return fetchPostComment(id, username, body).then((data) => {
    response.status(201).send(data);
  }).catch((error) => {
    next(error)
  });
};

module.exports = {
  getArticles,
  getArticleByID,
  postCommentByArticleID,
};

const {fetchCommentByArticleID} = require("../models.js/commentModel");

const getCommentByArticleID = (request, response, next) => {
  const { id } = request.params;
  return fetchCommentByArticleID(id)
    .then((data) => {
          response.status(200).send({comments : data})
      })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getCommentByArticleID }

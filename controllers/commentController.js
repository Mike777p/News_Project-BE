const {fetchCommentByArticleID} = require("../models.js/commentModel");

const getCommentByArticleID = (request, response, next) => {
  const { id } = request.params;
  return fetchCommentByArticleID(id)
    .then((data) => {
      if (data.length > 0) {
          response.status(200).send({comments : data})
      } else {response.status(404).send({msg : "Not found" })}
      })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getCommentByArticleID }

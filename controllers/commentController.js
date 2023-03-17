const {fetchCommentByArticleID, goDeleteCommentById} = require("../models.js/commentModel");

const getCommentByArticleId = (request, response, next) => {
  const { id } = request.params;
  return fetchCommentByArticleID(id)
    .then((data) => {
          response.status(200).send({comments : data})
      })
    .catch((error) => {
      next(error);
    });
};

const deleteCommentById = (request, response, next) => {
  const { id } = request.params;
  return goDeleteCommentById(id).then((data)=>{
    response.status(204).send({"deleted" : `column_id: ${data}`})
  })
}

module.exports = { getCommentByArticleId, deleteCommentById }

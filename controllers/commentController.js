const fetchCommentByArticleID = require("../models.js/commentModel");

const getCommentByArticleID = (request, response, next) => {
  const { id } = request.params;
  console.log("id in Controller ok?, did fetch trigger?>", id)
  return fetchCommentByArticleID(id)
    .then((data) => {
        console.log("data in controller from db", data)
      })
    .catch((error) => {
        console.log(error)
    //   next(error);
    });
};

module.exports = { getCommentByArticleID }

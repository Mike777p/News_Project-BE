const {
  fetchCommentCounts,
  fetchArticleByID,
} = require("../models.js/articleModel");

const getArticles = (request, response, next) => {
  const data = fetchCommentCounts().then((data) => {
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
      response.status(404).send({msg: "Not found"})
    }
  })
  .catch((error)=>{
    next(error)
  })
};

module.exports = {
  getArticles,
  getArticleByID,
};

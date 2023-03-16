const {
  fetchArticles,
  // fetchCommentCounts,
  fetchArticleById,
  PostComment,
  FetchpatchArticleById
} = require("../models.js/articleModel");


const getArticles = (request, response, next) => {
  const { topic, sort_by ='', order ='desc' } = request.query;
  
  fetchArticles(topic, sort_by, order)
    .then((data) => { 
        const articles = data.map((obj) => {
        const { comment_count } = obj;
        return { ...obj, comment_count: parseInt(comment_count) };
      });
      response.status(200).send({ articles });
    })
    .catch(next);
};

module.exports = { getArticles };


const getArticleById = (request, response, next) => {
  const { id } = request.params;
  return fetchArticleById(id)
    .then((data) => {

        response.status(200).send({ article: data[0] });
    })
    .catch(next);
};


const postCommentByArticleId = (request, response, next) => {
  const { id } = request.params;
  const { username, body } = request.body;
  return PostComment(id, username, body)
    .then((data) => {
        response.status(201).send({ "comment": data });
    })
    .catch(next);
};

const patchArticleById = (request, response, next) => {
  const { article_id } = request.params;
  const { inc_votes } = request.body;
  return FetchpatchArticleById(inc_votes, article_id)
    .then((article) => {
    response.status(200).send({"article" : article})
  })
    .catch((error) => { 
      next(error);
    });
};

module.exports = {
  getArticles,
  getArticleById,
  postCommentByArticleId,
  patchArticleById,
};

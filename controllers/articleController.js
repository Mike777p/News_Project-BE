const { fetchCommentCounts } = require("../models.js/articleModel");

const getArticles = (request, response, next) => {
  return fetchCommentCounts().then((data) => {
    finishedData = data.map((obj) => {
       const {comment_count} = obj
      return { ...obj, comment_count: parseInt(comment_count) };
    });
    
    return response.status(200).json({articles: finishedData});
  })
  .catch((error) => {
    // If error occurs, call the next middleware function with the error
    next(error);
  });
};

module.exports = getArticles;

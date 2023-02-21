const {
  fetchArticles,
  fetchCommentCounts,
} = require("../models.js/articleModel");

const getArticles = (request, response, next) => {
    return fetchCommentCounts().then((data)=>{
        finishedData = data.map((obj)=>{
            return { ...obj, comment_count: parseInt(obj.comment_count) }
        })

        finishedData.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB - dateA;
          });

        return response.status(200).json(finishedData);
    })
}

// const getArticles = (request, response, next) => {
//     // Wait for both fetchArticles and fetchCommentCounts to complete using Promise.all
//     Promise.all([fetchArticles(), fetchCommentCounts()])
//       .then(([articles, commentCounts]) => {
//         // Combine the two data sets by mapping over articles and adding a comment_count property to each article
//         const articlesWithComments = articles.map((article) => {
//           const commentCount =
//             commentCounts.find((comment) => comment.article_id === article.article_id)?.count ?? 0;
//           return { ...article, comment_count: parseInt(commentCount) };
//         });
//         // Send combined data as a JSON response
//         return response.status(200).json(articlesWithComments);
//       })
//       .catch((error) => {
//         // Handle any errors that occur
//         next(error);
//       });
//   };
  
module.exports = getArticles;

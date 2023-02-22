const db = require("../db/connection");

//  Function to return an array with all articles
// exports.fetchArticles = ((error)=>{
//     return db.query(`SELECT * FROM articles`).then((data)=>{
//         return data.rows
//     })
// })

exports.fetchCommentCounts = (error) => {
    return db.query(`SELECT articles.*, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id;`).then(data => {
        // console.log(data.rows)
      return data.rows;
    })
}

// // Function return an object of a count of coments per article ID
// exports.fetchCommentCounts = (error) => {
//     return db.query(`SELECT article_id, COUNT(*) as count 
//       FROM comments 
//       GROUP BY article_id;
//     `).then(data => {
//         console.log(data.rows)
//       return data.rows;
//     });
//   };
  

  
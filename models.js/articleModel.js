const db = require("../db/connection");

const fetchCommentCounts = () => {
  return db
    .query(
      `SELECT articles.*, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id ORDER BY created_at DESC;`
    )
    .then((data) => {
      return data.rows;
    });
};

const fetchArticleByID = (id) => {
  return db
    .query(
      `SELECT * FROM articles 
  WHERE article_id=$1`,
      [id]
    )
    .then((data) => {
      return data.rows;
    })
};

const fetchPostComment = (id, username, body) => {
  // console.log("MADE IT TO DB!!")
  return db
  .query(
    `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
    [id, username, body]
  )
  .then((data) => {
    // console.log("returned data, did it get back to the controller?")
    return data.rows;
  })
}

module.exports = { fetchCommentCounts, fetchArticleByID, fetchPostComment }
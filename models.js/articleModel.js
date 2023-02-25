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

const fetchArticleById = (id) => {
  return db
    .query(
      `SELECT * FROM articles 
  WHERE article_id=$1`,
      [id]
    )
    .then((data) => {
      if (data.rowCount === 0) {
        return Promise.reject("Item not found")
      }
      return data.rows;
    })
};


const PostComment = (id, username, body) => {
  return db
  .query(
    `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
    [id, username, body]
  )
  .then((data) => {
    return data.rows[0];
  })
}

const FetchpatchArticleById = (inc_votes, id) => {
  return db.query(`UPDATE articles
  SET votes = CASE 
    WHEN votes >= 0 THEN votes + $1
    ELSE votes - $1
  END
  WHERE article_id = $2 RETURNING *;
  `, [inc_votes, id]).then((data) => {
    if (data.rowCount === 0) {
      return Promise.reject("Item not found")
    }
    return data.rows[0]
  })
}

module.exports = { fetchCommentCounts, fetchArticleById, PostComment, FetchpatchArticleById }
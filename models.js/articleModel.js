const db = require("../db/connection");


const fetchArticles = (topic, sort_by, order) => {
  const sortBy = (sort_by || "created_at");
  const sortOrder = order === "desc" ? "DESC" : "ASC";

  let whereClause = "";
  if (topic) {
    whereClause = `WHERE topic = '${topic}'`;
  }
  
  const sql = `
    SELECT articles.*, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    ${whereClause}
    GROUP BY articles.article_id
    ORDER BY ${sortBy} ${sortOrder};
  `;
  return db.query(sql).then((data) => {
    return data.rows;
  });
};

module.exports = { fetchArticles };

const fetchArticleById = (id) => {
  return db
    .query(
      `SELECT articles.*, COUNT(comments.article_id) AS comment_count
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
      WHERE articles.article_id = $1
      GROUP BY articles.article_id`,
      [id]
    )
    .then((data) => {
      if (data.rowCount === 0) {
        return Promise.reject("Item not found");
      }
      return data.rows;
    });
};

const PostComment = (id, username, body) => {
  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
      [id, username, body]
    )
    .then((data) => {
      console.info(data)
      return data.rows[0];
    });
};

const FetchpatchArticleById = (inc_votes, id) => {
  return db
    .query(
      `UPDATE articles
  SET votes = CASE 
    WHEN votes >= 0 THEN votes + $1
    ELSE votes - $1
  END
  WHERE article_id = $2 RETURNING *;
  `,
      [inc_votes, id]
    )
    .then((data) => {
      if (data.rowCount === 0) {
        return Promise.reject("Item not found");
      }
      return data.rows[0];
    });
};

module.exports = {
  // fetchCommentCounts,
  fetchArticles,
  fetchArticleById,
  PostComment,
  FetchpatchArticleById,
};

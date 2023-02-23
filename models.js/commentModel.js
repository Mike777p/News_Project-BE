const db = require("../db/connection");

const fetchCommentByArticleID = (id) => {
    return db
      .query(
        `SELECT * FROM comments 
    WHERE article_id=$1`,
        [id]
      )
      .then((data) => {
        return data.rows;
      })
  };

  module.exports = { fetchCommentByArticleID }
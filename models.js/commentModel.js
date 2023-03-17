const db = require("../db/connection");

const fetchCommentByArticleID = (id) => {
    return db
      .query(
        `SELECT * FROM comments 
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

  const goDeleteCommentById = (id) => {
    return db.query(
      `DELETE FROM comments 
  WHERE comment_id = $1;`,
      [id]
    ).then((data) => {
      return data;
    });
  };
  
  

  module.exports = { fetchCommentByArticleID, goDeleteCommentById }
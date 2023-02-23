const db = require("../db/connection");

exports.fetchCommentByArticleID = (id) => {
    console.log("Fetch db triggered, did db return?")
    return db
      .query(
        `SELECT * FROM comments 
    WHERE article_id=$1`,
        [id]
      )
      .then((data) => {
        console.log("db returned! in model", data)
        return data.rows;
      })
  };
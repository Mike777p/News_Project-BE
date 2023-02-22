const db = require("../db/connection");


// Function to fetch list of topics from the database
exports.fetchTopics = (error) => {
    // SQL query to retrieve all rows from the topics table
    return db.query(`SELECT * FROM topics`).then((data) => {
      // If successful, extract rows from data object and return them
      return data.rows;
    });
  };
  


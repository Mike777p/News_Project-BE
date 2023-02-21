// const { request, response } = require("../app");
const { fetchTopics } = require("../models.js/topicsModule");
// const { handle500Status } = require("./ErrorHandlers");

const getTopics = (request, response, next) => {
  // Fetch list of topics from database with fetchTopics function
  fetchTopics()
    .then((topics) => {
      // If successful, send list of topics in response with a 200 status code
      return response.status(200).send(topics);
    })
    .catch((error) => {
      // If error occurs, call the next middleware function with the error
      next(error);
    });
};


module.exports = getTopics;

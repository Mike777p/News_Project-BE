const { request } = require("../app");
const { fetchTopics } = require("../modules/topicsModule");
const { handle500Status } = require("./ErrorHandlers");

const getTopics = (request, response)=>{
    fetchTopics().then((topics)=>{
        // console.log(topics)
        return response.status(200).send(topics)
    }).catch((error) => {
        handle500Status(error, request, response)
      });
}

module.exports = getTopics
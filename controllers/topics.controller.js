const { request } = require("../app");
const { fetchTopics } = require("../modules/topicsModule");
const { handle500Status } = require("./ErrorHandlers");

const getTopics = (request, response)=>{
    fetchTopics().then((topics)=>{
        return response.status(200).send(topics)
    }).catch((error) => {
       
      });
}

module.exports = getTopics
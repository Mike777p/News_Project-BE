const { request } = require("../app");

exports.handle500Status = ((error, request, response, next)=>{
    console.log(error);
    response.status(500).send({msg: "There has been a server error"})
});

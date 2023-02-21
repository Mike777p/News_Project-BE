const { request } = require("../app");

exports.handle500Status = ((error, request, response, next) => {
    console.log(error);
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';
    response.status(status).send({msg: message});
  });
  

  
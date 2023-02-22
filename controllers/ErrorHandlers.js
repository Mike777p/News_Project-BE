exports.handle404PathNotFound = ((request, response, next)=>{
  response.status(404).send({msg: "Path not found"})
})

exports.handle500Status = ((error, request, response, next) => {
    console.log("505!!!!!!!!!!");
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';
    response.status(status).send({msg: message});
  });
  

  
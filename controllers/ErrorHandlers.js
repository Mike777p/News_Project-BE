exports.handle404PathNotFound = ((request, response, next)=>{
  response.status(404).send({msg: "Path not found"})
})

exports.handle400StatusBadRequest = ((error, request, response, next) => {
  if (error.code === '22P02'){
    response.status(400).send({msg: "Bad Request"});
  } else {next(error)}
});

exports.handle500Status = ((error, request, response, next) => {
    console.log("500", error);
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';
    response.status(status).send({msg: message});
  });
  


exports.handle404PathNotFound = ((request, response, next)=>{
  response.status(404).send({msg: "Path not found"})
})

exports.handle400StatusBadRequest = ((error, request, response, next) => {
  if (error.code === '22P02'){
    response.status(400).send({msg: "Bad Request"});
  } else if (error.code === "23503" || error === "Item not found" || error.code === "42601") {
    response.status(404).send({"msg" : "Item not found"})
  } else {next(error)}
});

exports.handle500Status = ((error, request, response, next) => {
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';
    response.status(status).send({"msg": message});
  });


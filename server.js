const http = require('http');
const app = require('./backend/app');
const debug = require('debug')("node-angular");

/*
Simply make sure that when we try to setup a PORT
or especially when we receive it as an ENV port it is a valid number
 */
const normalizePort = val => {
  let port = parseInt(val,10)

  if(isNaN(port)){
    // named pipe
    return val;
  }

  if(port >= 0) {
    // port number
    return port;
  }

  return false;
};


/*
Check which type of error occurred and type a message and exit gracefully from out node js server
 */
const onError = error => {
  if (error.syscall !== "listen"){
    throw error;
  }

  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }

}

/*
Simply log what port we are now listening for incoming requests
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
}


/*
Setup the port and call the normalizeFunction to check the port
Use "3000" as a string because usually the env variable is also a string most of times
 */
const port = normalizePort(process.env.PORT || "3000");

/*
Set this port on the express app
 */
app.set('port', port);

/*
Setup the node server
 */
const server = http.createServer(app);

/*
Register the listeners

* one for error
* one for whenever we start listening
 */
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

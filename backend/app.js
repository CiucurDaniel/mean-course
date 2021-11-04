const express = require('express');

const app = express();

app.use( (req,res,next) => {
  console.log("First middleware");
  next();
});

app.use( (req,res,next) => {
  res.send('Hello from express');
});

// export my app, the Node.Js way, simple export doesn't work here

module.exports = app;

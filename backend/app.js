const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');

const app = express();

mongoose.connect("mongodb+srv://user1:QGKzQUolzIxHxCRe@clustermeancourse.be6yd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then( () => console.log("Connected to the database!"))
  .catch( () => console.log("Connection failed!"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*
No path set here because we want this to do this for all incoming requests
 */
app.use( (req, res, next) => {

  // this refers to which domains can access our API
  res.setHeader("Access-Control-Allow-Origin", '*');

  // allow some extra headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // control which http verbs can send requests
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );

  // next means simply want to forward the request to the other middlewares we have
  next();
});

app.use('/api/posts', postRoutes);

// export my app, the Node.Js way, simple export doesn't work here
module.exports = app;

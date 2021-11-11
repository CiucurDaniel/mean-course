const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post')

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

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  // mongoose does the work in the background
  post.save();

  res.status(201).json({
    message: 'Post successfully added.'
  });
});


app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
  console.log(req.params.id);
  res.status(200).json({message: "Post deleted"});
})

// export my app, the Node.Js way, simple export doesn't work here
module.exports = app;

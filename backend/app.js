const express = require('express');

const app = express();

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


app.use('/api/posts', (req, res, next) => {
  const posts = [
    {id: "1223f",
    title: "Post 1",
    content: "This is my content"
    },
    {id: "1223f",
    title: "Post 2",
    content: "This is my awesome content"
    },
    {id: "1223f",
    title: "Post 3",
    content: "This is my content number 3."
    },
  ];

  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

// export my app, the Node.Js way, simple export doesn't work here

module.exports = app;

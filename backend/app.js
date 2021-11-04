const express = require('express');

const app = express();

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

const express = require('express')
const Post = require("../models/post");
const multer = require('multer');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimeType];
    let error = new Error("Invalid mime type");
    if(isValid) {
      error = null;
    }
    // path relative to server.js
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimeType];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


router.post('', multer(storage).single('image'), (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  // mongoose does the work in the background
  // here we send as response the createdPost in order to give the client
  // the postId
  post.save().then( createdPost => {
    res.status(201).json({
      message: 'Post successfully added.',
      postId: createdPost._id
    });
  });

});

router.put('/:id', (req , res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });


  //Give the id of the post and what you want to replace it with, in our case a new Post object
  Post.updateOne({_id: req.params.id}, post)
    .then( result => {
      res.status(200).json({message: 'Update successful'});
    });
});

router.get('', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({message: "Post deleted"});
    })
});


router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then( post => {
      if(post){
        res.status(200).json(post);
      } else {
        res.status(404).json({message: 'Post not found!'});
      }
    });
});

module.exports = router;

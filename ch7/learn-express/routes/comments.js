var express = require('express');
var Users = require('../models').User;
var Comments = require('../schemas/comments');

var router = express.Router();

router.get('/:id', function (req, res, next) {
  Comments.find({ commenter: req.params.id }).populate('commenter')
    .then((comments) => {
      console.log(comments);
      res.json(comments);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.post('/', function (req, res, next) {
  const comment = new Comments({
    commenter: req.body.id,
    comment: req.body.comment,
  });
  comment.save()
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.patch('/:id', function (req, res, next) {
  Comments.update({
    _id: req.params.id,
  }, {
    comment: req.body.comment,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.delete('/:id', function (req, res, next) {
  Comments.remove({
    _id: req.params.id,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;

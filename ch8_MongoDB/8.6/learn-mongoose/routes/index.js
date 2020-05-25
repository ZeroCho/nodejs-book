var express = require('express');
var User = require('../schemas/user');

var router = express.Router();

router.get('/', function (req, res, next) {
  User.find({})
    .then((users) => {
      res.render('mongoose', { users });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;

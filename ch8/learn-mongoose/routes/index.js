var express = require('express');
var Users = require('../schemas/users');

var router = express.Router();

router.get('/', function (req, res, next) {
  Users.find({})
    .then((users) => {
      res.render('mongoose', { users });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;

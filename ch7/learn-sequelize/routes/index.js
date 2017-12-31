var express = require('express');
var Users = require('../models').User;

var router = express.Router();

router.get('/', function (req, res, next) {
  Users.findAll({})
    .then((users) => {
      res.render('sequelize', { users });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;

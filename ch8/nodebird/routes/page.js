const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');

const router = express.Router();

router.get('/profile', isLoggedIn, (req, res, next) => {
  res.render('profile', { title: '내 정보 - NodeBird', user: req.user });
});

router.get('/join', isNotLoggedIn, (req, res, next) => {
  res.render('join', { title: '회원가입 - NodeBird', user: req.user, joinError: req.flash('joinError') });
});

router.get('/', (req, res, next) => {
  console.log(req.user && req.user.following, req.user && req.user.follower);
  Post.findAll({
    include: {
      model: User,
      attributes: ['id', 'nick'],
    },
    order: [['createdAt', 'DESC']],
  })
    .then((posts) => {
      res.render('main', { title: 'NodeBird', twits: posts, user: req.user, loginError: req.flash('loginError') });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

module.exports = router;

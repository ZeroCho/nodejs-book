const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');

const router = express.Router();

// POST /auth/join
router.post('/join', isNotLoggedIn, join); 

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

// GET /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

// GET /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/?error=카카오로그인 실패',
}), (req, res) => {
  res.redirect('/'); // 성공 시에는 /로 이동
});

module.exports = router;

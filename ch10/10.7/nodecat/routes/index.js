const express = require('express');
const { searchByHashtag, getMyPosts, renderMain } = require('../controllers');

const router = express.Router();

router.get('/myposts', getMyPosts);

router.get('/search/:hashtag', searchByHashtag);

router.get('/', renderMain);

module.exports = router;

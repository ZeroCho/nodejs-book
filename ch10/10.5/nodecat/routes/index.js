const express = require('express');
const { searchByHashtag, getMyPosts } = require('../controllers');

const router = express.Router();

router.get('/myposts', getMyPosts);

router.get('/search/:hashtag', searchByHashtag);

module.exports = router;

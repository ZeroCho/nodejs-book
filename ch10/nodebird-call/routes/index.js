const express = require('express');
const axios = require('axios');

const router = express.Router();
const CLIENT_SECRET = process.env.CLIENT_SECRET || '78ccab6c-be6f-4742-83c3-9b73124a5f31';

const issueToken = async (req) => {
  try {
    const tokenResult = await axios.post('http://localhost:8002/v1/token', { clientSecret: CLIENT_SECRET });
    if (tokenResult.data && tokenResult.data.code === 200) { // 토큰 발급 성공
      req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
      return tokenResult.data;
    }
    throw new Error(tokenResult.data); // 토큰 발급 실패
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const requester = async (req, requestURL) => {
  try {
    if (!req.session.jwt) { // 세션에 토큰이 없으면
      await issueToken(req); // 토큰 발급
    }
    let result = await axios.get(requestURL, { headers: { authorization: req.session.jwt } });
    if (result.data.code === 419) { // 토큰 유효기한 초과
      await issueToken(req);
      result = await axios.get(requestURL, { headers: { authorization: req.session.jwt } });
    }
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

router.get('/mypost', async (req, res, next) => {
  try {
    const requestURL = 'http://localhost:8002/v1/posts/my';
    const result = await requester(req, requestURL);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/search/:hashtag', async (req, res, next) => {
  try {
    const requestURL = `http://localhost:8002/v1/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`;
    const result = await requester(req, requestURL);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

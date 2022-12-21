const express = require('express');

const { verifyToken } = require('../middlewares');
const { createToken, tokenTest } = require('../controllers/v1');

const router = express.Router();

// POST /v1/token
router.post('/token', createToken);

// POST /v1/test
router.get('/test', verifyToken, tokenTest);

module.exports = router;

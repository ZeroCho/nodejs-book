const express = require('express');

const router = express.Router();

router.post('/token', (req, res, next) => {
  const { clientId } = req.body;
  console.log(req.host, clientId);
});

router.get('/refresh', (req, res, next) => {

});

module.exports = router;

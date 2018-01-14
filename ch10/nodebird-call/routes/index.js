const express = require('express');
const axios = require('axios');

const router = express.Router;

router.get('/', async (req, res, next) => {
  try {
    const token = await axios.post('http://localhost:8002/v1/token', { clientId: '8c7834f0-ab45-4adc-bd6a-412eb75a9ed3' });
    if (token) {

    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

const express = require('express');
const util = require('util');
const googleMaps = require('@google/maps');

const History = require('../schemas/history');
const Favorite = require('../schemas/favorite');

const router = express.Router();
const googleMapsClient = googleMaps.createClient({
  key: process.env.PLACES_API_KEY,
});

router.get('/', async (req, res, next) => {
  try {
    const favorites = await Favorite.find({});
    res.render('index', { results: favorites });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/autocomplete/:query', (req, res, next) => {
  googleMapsClient.placesQueryAutoComplete({
    input: req.params.query,
    language: 'ko',
  }, (err, response) => {
    if (err) {
      return next(err);
    }
    return res.json(response.json.predictions);
  });
});

router.get('/search/:query', async (req, res, next) => {
  const googlePlaces = util.promisify(googleMapsClient.places);
  const googlePlacesNearby = util.promisify(googleMapsClient.placesNearby);
  const { lat, lng, type } = req.query;
  try {
    const history = new History({ query: req.params.query });
    await history.save();
    let response;
    if (lat && lng) {
      response = await googlePlacesNearby({
        keyword: req.params.query,
        location: `${lat},${lng}`,
        rankby: 'distance',
        language: 'ko',
        type,
      });
    } else {
      response = await googlePlaces({
        query: req.params.query,
        language: 'ko',
        type,
      });
    }
    res.render('result', {
      title: `${req.params.query} 검색 결과`,
      results: response.json.results,
      query: req.params.query,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/location/:id/favorite', async (req, res, next) => {
  try {
    const favorite = await Favorite.create({
      placeId: req.params.id,
      name: req.body.name,
      location: [req.body.lng, req.body.lat],
    });
    res.send(favorite);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

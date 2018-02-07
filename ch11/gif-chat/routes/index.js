const express = require('express');
const multer = require('multer');
const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('main');
});

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', async (req, res, next) => {
  try {
    const room = new Room({});
    const newRoom = await room.save();
    res.redirect(`/room/${newRoom._id}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/room/:id', async (req, res, next) => {
  try {
    const room = await Room.findOne({ _id: req.params.id });
    if (room) {
      res.render('room', { room, title: room.title });
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/chat', async (req, res, next) => {
  try {
    const chat = new Chat({

    });
    res.send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

const upload = multer({

});
router.post('/img', upload.single('gif'), async (req, res, next) => {

});

module.exports = router;

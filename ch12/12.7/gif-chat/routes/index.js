const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {
  renderMain, renderRoom, createRoom, enterRoom, removeRoom, sendChat, sendGif,
} = require('../controllers');

const router = express.Router();

router.get('/', renderMain);

router.get('/room', renderRoom);

router.post('/room', createRoom);

router.get('/room/:id', enterRoom);

router.delete('/room/:id', removeRoom);

router.post('/room/:id/chat', sendChat);

try {
  fs.readdirSync('uploads');
} catch (err) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
router.post('/room/:id/gif', upload.single('gif'), sendGif);

module.exports = router;

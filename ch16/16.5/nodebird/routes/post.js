const express = require('express');
const multer = require('multer');
const fs = require('fs');
const multerGoogleStorage = require('multer-google-storage');

const { afterUploadImage, uploadPost } = require('../controllers/post');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multerGoogleStorage.storageEngine({
    bucket: 'nodebird3',
    projectId: 'node-deploy-358509',
    keyFilename: 'node-deploy-358509-a2917cd5849c.json',
    filename: (req, file, cb) => {
      cb(null, `original/${Date.now()}_${file.originalname}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// POST /post/img
router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);

// POST /post
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), uploadPost);

module.exports = router;

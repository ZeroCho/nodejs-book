const { Post, Hashtag } = require('../models');

exports.afterUploadImage = (req, res) => {
  console.log(req.file);
  const filePath = req.file.path.split('/').splice(0, 3).join('/');
  const originalUrl = `${filePath}/${req.file.filename}`;
  const url = originalUrl.replace(/\/original\//, '/thumb/');
  res.json({ url, originalUrl });
};

exports.uploadPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    const hashtags = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag => {
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          })
        }),
      );
      await post.addHashtags(result.map(r => r[0]));
    }
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

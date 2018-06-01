const storage = require('@google-cloud/storage')();
const gm = require('gm').subClass({ imageMagick: true });

exports.resizeAndUpload = (req, res) => {
  const { filename } = req.query;
  const bucket = 'node-deploy';
  if (!filename) {
    res.sendStatus(500).send('파일 이름을 쿼리스트링에 넣어주세요.');
    return;
  }
  const file = storage.bucket(bucket).file(filename);
  if (!file) {
    res.sendStatus(404).send('해당 파일이 없습니다.');
    return;
  }

  const readStream = file.createReadStream();

  readStream.on('error', (err) => {
    console.error(err);
    res.sendStatus(err.code).send(err);
  });

  const newFile = storage.bucket(bucket).file(`thumb_${filename}`);
  const writeStream = newFile.createWriteStream();

  gm(readStream)
    .resize(200, 200, '^')
    .quality(90)
    .stream((err, stdout) => {
      if (err) {
        console.error(err);
        return res.sendStatus(err.code).send(err);
      }
      stdout.pipe(writeStream);
      stdout.on('end', () => {
        res.send(`thumb_${filename}`);
      });
      return stdout.on('error', (err) => {
        console.error(err);
        res.sendStatus(err.code).send(err);
      });
    });
};

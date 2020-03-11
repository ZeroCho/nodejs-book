const storage = require('@google-cloud/storage')();
const sharp = require('sharp');

exports.resizeAndUpload = (data, context) => {
  const { bucket, name } = data;
  const ext = name.split('.')[name.split('.').length - 1];
  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext; // sharp에서는 jpg 대신 jpeg사용합니다
  console.log('name', name, 'ext', ext);

  const file = storage.bucket(bucket).file(name);
  const readStream = file.createReadStream();

  const newFile = storage.bucket(bucket).file(`thumb/${name}`);
  const writeStream = newFile.createWriteStream();

  sharp(readStream)
    .resize(200, 200, { fit: 'inside' })
    .toFormat(requiredFormat)
    .pipe(writeStream);
  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => {
      resolve(`thumb/${name}`);
    });
    writeStream.on('error', reject);
  });
};

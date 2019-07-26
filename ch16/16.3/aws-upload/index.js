const AWS = require('aws-sdk');
const gm = require('gm').subClass({ imageMagick: true });

const s3 = new AWS.S3();

exports.handler = (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name;
  const Key = event.Records[0].s3.object.key;
  const filename = Key.split('/')[Key.split('/').length - 1];
  const ext = Key.split('.')[Key.split('.').length - 1];
  console.log('Key', Key, filename, ext);
  s3.getObject({ Bucket, Key }, (err, data) => {
    if (err) {
      console.error(err);
      return callback(err);
    }
    console.log('getObj', data);
    return gm(Buffer.from(data.Body))
      .resize(800, 800)
      .stream(function (err, stdout, stderr) { // 스트림에 출력하는
        if (err) {
          console.error(err);
          return callback(err);
        }
        const chunks = [];  // 스트림 청크를 모으는위한 배열
        stdout.on('data', function (chunk) {
          console.log('pushed');
          chunks.push(chunk);  // 청크를 모으는
        });
        stdout.on('end', function () {
          console.log('end');
          const buffer = Buffer.concat(chunks);  // 마지막까지 모아서 저축 경우에 결합하여 버퍼로 내보낼
          console.log('buffer', buffer);
          s3.putObject({
            Bucket,
            Key: `thumb/${filename}`,
            Body: buffer,
          }, function (err, data) {  // S3에 내보낼
            if (err) {
              console.error(err);
              return callback(err);
            }
            console.log('put');
            return callback(null, `thumb/${filename}`);
          });
        });
      });
  });
}

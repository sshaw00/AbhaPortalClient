require('dotenv').config();
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const sqs = new AWS.SQS({
  apiVersion: '2012-11-05',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});
const queueUrl = process.env.SQS_URL_BULK_GST;

/*

const bucketName = 'com.varthana.car-images';
let imageArr = [];

s3.listObjectsV2({ Bucket: bucketName }, function (err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {
    data.Contents.forEach(function (content) {
      const objectKey = content.Key;
      const url = s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: objectKey,
      });
      imageArr.push(url);
    });
  }
  //console.log(imageArr)
});
setTimeout(() => {
  console.log(imageArr);
}, 2000); */

module.exports = { s3, sqs, queueUrl };
// module.exports = { imageArr: imageArr }

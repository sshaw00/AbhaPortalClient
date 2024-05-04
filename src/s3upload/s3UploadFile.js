/* eslint-disable */
const dateFormat = require('dateformat');
const { request } = require('express');
const s3 = require('../utils/aws');
const { v4: uuidv4 } = require('uuid');
const { logger } = require('../middlewares/winston');

function s3UploadFile(requestFile, user, loanId, filename) {
  return new Promise((resolve, reject) => {
    const now = new Date();
    const time = dateFormat(now, 'isoDateTime').toString().split('+').join('_');
    const buf = requestFile.buffer;
    const ext = `.${requestFile.mimetype.split('/')[1]}`;
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${loanId}/${user}/${filename}_${time.toString().split(':').join('_')}${ext}`,
      Body: buf,
      ContentEncoding: 'base64',
      ACL: 'public-read',
      ContentType: requestFile.mimetype,
    };
    s3.s3.upload(params, (err, data) => {
      if (err) {
        logger.error(`Document not Uploaded to S3 for loan id ${loanId} error is ${err}`)
        reject(err);
      }
      if (data) {
        logger.info(`Document Uploaded to S3 for loan id ${loanId} and files are: ${requestFile} for user ${user} with file name: ${filename}`)
        logger.info(`Document uploaded successfully for loan id ${loanId} and location is ${data.Location}`)
        resolve(data.Location);
      }
    });
  });
}

function s3UploadDocuments(requestFile, root, id, filename) {
  console.log("requestFile ", requestFile)
  return new Promise((resolve, reject) => {
    const now = new Date();
    const time = dateFormat(now, 'isoDateTime').toString().split('+').join('_');
    const buf = requestFile.buffer;
    const ext = `.${requestFile.mimetype.split('/')[1]}`;
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${root}/${filename}_${time.toString().split(':').join('_')}${ext}`,
      Body: buf,
      ContentEncoding: 'base64',
      ACL: 'public-read',
      ContentType: requestFile.mimetype,
    };
    s3.s3.upload(params, (err, data) => {
      if (err) {
        logger.error(`Document not Uploaded to S3,  document for ${root} and document id ${id} error is ${err}`)
        reject(err);
      }
      if (data) {
        logger.info(`Document Uploaded to S3, document for ${root} and document id ${id} and files are: ${requestFile} with file name: ${filename}`)
        logger.info(`Document uploaded successfully, document for ${root} and document id ${id} and loacation is ${data.Location}`)
        resolve(data.Location);
      }
    });
  });
}

module.exports = { s3UploadFile, s3UploadDocuments };

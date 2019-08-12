const testFolder = './assets/';
const fs = require('fs');
let AWS = require('ibm-cos-sdk');
const config = require('./config');
let cos = new AWS.S3(config.config);

let persist = function (files) {
// let persist = function (filePath, fileName) {
  let currentFile = files.pop();
  return new Promise((resolve, reject) => {
      console.log('Uploading file: ' + currentFile);
      var request = cos.putObject
      return cos.putObject({
          Bucket: config.BUCKET,
          Key: currentFile,
          Body: fs.createReadStream('./assets/'+ currentFile),
          ACL: 'public-read'
      }).promise()
          .then(() => {
              if (files.length > 0) {
                persist(files).then(() => {
                  console.log("Qty pending: " + files.length + "file completed: ", currentFile)
                  resolve(currentFile)    
                })
              } else {
                console.log("last file completed: ", currentFile)
                resolve(currentFile)
              }
          })
          .catch((err) => {
              console.log(err);
              reject(err)
          });
  });
};

persist(fs.readdirSync(testFolder))
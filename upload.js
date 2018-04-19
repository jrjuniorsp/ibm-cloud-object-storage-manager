const testFolder = './assets/';
const fs = require('fs');
let AWS = require('ibm-cos-sdk');
const config = require('./config');
let cos = new AWS.S3(config.config);

let persist = function (filePath, fileName) {
  return new Promise((resolve, reject) => {
      console.log('Uploading file: ' + fileName);
      var request = cos.putObject
      return cos.putObject({
          Bucket: config.BUCKET,
          Key: fileName,
          Body: fs.createReadStream(filePath),
          ACL: 'public-read'
      }).promise()
          .then(() => {
              resolve(fileName)
          })
          .catch((err) => {
              console.log(err);
              reject(err)
          });
  });
};


fs.readdirSync(testFolder).forEach(file => {
  persist('./assets/' + file, file)
  .then(fileName => {
    console.log('Upload done: ' + fileName);
  }) 
  .catch(error => {
    console.log('Error: ' + file);
  });
});
const testFolder = './assets/';
const fs = require('fs');
const config = require('./config');
const AWS = require('ibm-cos-sdk');
const cos = new AWS.S3(config.config);
var page = 0;

console.log('Downloading...');

var listAndGet = function (startAfterParam) {
  page++;
  var params = {
    Bucket: config.BUCKET,
    StartAfter: startAfterParam
  };
  if (startAfterParam) params.StartAfter = startAfterParam;
  // 'StartAfter': '062c6940-6835-11e9-8d24-8d635574eeaa'
  cos.listObjectsV2(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      let qtyOfListedObjects = data.Contents.length;
      let downloadedQty = 0;
      data.Contents.forEach(element => {
        //Download object
        var params2 = {
          Bucket: config.BUCKET,
          Key: element.Key
        };
        console.log('Downloading..: ' + element.Key);
        cos.getObject(params2, function (err, data2) {
          if (err) console.log(err, err.stack); // an error occurred
          else {
            fs.writeFile("./assets/" + element.Key, data2.Body, function (err) {
              if (err) {
                return console.log(err);
              }
              ++downloadedQty;
              if (downloadedQty === qtyOfListedObjects) {
                let lastDownloadedKey = data.Contents[qtyOfListedObjects - 1].Key;
                if (downloadedQty === 1000) {
                  listAndGet(lastDownloadedKey)
                } else {
                  console.log("finish! The last downloaded file was " + lastDownloadedKey);
                }
              }
              console.log((downloadedQty * 100 / qtyOfListedObjects).toFixed(2) + "% of page " + page + " - The file " + element.Key + " was saved!");
            });
          }
        });
      });
      //console.log(data);           
    }
  })
}
listAndGet()
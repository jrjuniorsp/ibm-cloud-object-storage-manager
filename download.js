const testFolder = './assets/';
const fs = require('fs');
let AWS = require('ibm-cos-sdk');
const config = require('./config');
let cos = new AWS.S3(config.config);

console.log('Downloading...');
var params = {
  Bucket: config.BUCKET, 
};
cos.listObjects(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    data.Contents.forEach(element => {
      //Download object
      var params2 = {
        Bucket: config.BUCKET, 
        Key: element.Key
      };
      console.log('Downloading..: ' + element.Key);
      cos.getObject(params2, function(err, data2) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
          fs.writeFile("./assets/" + element.Key, data2.Body, function(err) {
            if(err) {
                return console.log(err);
            }        
            console.log("The file " + element.Key +" was saved!");
          });           
        }    
      });      
    });
    //console.log(data);           
  }
});
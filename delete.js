const testFolder = './assets/';
const fs = require('fs');
const config = require('./config');
let AWS = require('ibm-cos-sdk');
let cos = new AWS.S3(config.config);

var params = {
  Bucket: config.BUCKET, 
};
cos.listObjects(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    let objects = [];
    data.Contents.forEach(element => {
      let object = {
        Key: element.Key
      };
      objects.push(object)
    });
    let deleteObject = {
      Objects: objects
    }    
    //console.log(deleteObject);
    //Delete
    
    var params2 = {
      Bucket: config.BUCKET, 
      Delete: deleteObject      
    };      
    cos.deleteObjects(params2, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log('All files were deleted');           // successful response    
    });
  }
});
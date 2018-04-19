# Project

This is a very simple project (built in NodeJS) that I have created to manipulate the IBM Cloud Object Storage

It uses the [ibm-cos-sdk](https://www.npmjs.com/package/ibm-cos-sdk) library.

### Functionalities

There are three Functionalities, all split in different files:
 - download all files from bucket (file: download.js)
 - delete all files from bucket (file: delete.js). It delete only 1000 files per time.
 - upload all files from bucket (file: upload.js). In the case of the upload, I am using the ACL: 'public-read'. If you do not need this, remove this line in the upload.js file

### Setup

Take a look at the config.js file and fill up the information there.

Basically, you must insert four information:
- endpoint
- apiKeyId
- ibmAuthEndpoint (use this value: https://iam.ng.bluemix.net/oidc/token)
- serviceInstanceId

These four information you may get from IBM Cloud Object Storage admin console. Take a look at the "Service Credentials"

```
{
  "apikey": "<this is the apiKeyId>",
  "endpoints": "<this is the endpoint>",
  "iam_apikey_description": "XXXXXX",
  "iam_apikey_name": "XXXXX",
  "iam_role_crn": "XXXXX",
  "iam_serviceid_crn": "XXXXX",
  "resource_instance_id": "<this is the serviceInstanceId>"
}
```

You also must change the bucket-name

### Running

Before running, make sure you have changed the config.js file.

To run the scripts, you must have NodeJS installed and simply type the following command

```
node <filename>
```

E.g: to download all files from a certain bucket and save into the "assets" folder.

```
node download.js
```

Feel free to get this code, modify, fork and so on.

var AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'});

var dynamo = new AWS.DynamoDB({apiVersion: '2012-08-10'});
dynamo.listTables({}, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

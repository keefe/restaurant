var AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'});

module.exports = function(event, context) {
  var dynamo = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  var query = {
    TableName:'UserLeads'
  };
  dynamo.scan(query, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      var results = [];
      for(var item of data.Items){
        
      }
      console.log(data);           // successful response
      context.done(null, data);
    }    
  });
}
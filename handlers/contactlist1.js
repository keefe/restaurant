var AWS = require('aws-sdk');
var https = require('https');
AWS.config.update({region:'us-west-2'});

module.exports = function(event, context) {
  
   var dynamo = new AWS.DynamoDB(
  {
     apiVersion: '2012-08-10',
    httpOptions: {
      agent: new https.Agent(
      {
        ciphers: 'ALL',
        secureProtocol: 'TLSv1_method'
      })
    }
  });
  var query = {
    TableName:'UserLeads'
  };
  dynamo.scan(query, function(err, data) {
    if (err){
      console.log(err, err.stack); // an error occurred
    }else {
      console.log("Query is complete");
      console.log(data);           // successful response
      //TODO check the syntax of the following, but approximately
      var niceResults = [];
      for(item in data.Items){
        var formattedItem = {
          email:"defaultEmail",
          firstName:"defaultFirstName"
        };
        if(item.email.S!==undefined && item.email.S!=='') formattedItem.email = item.email.S;
        niceResults.push(formattedItem);
        
      }
      
      context.done(null, data);//change this to return the new array
    }    
  });
}

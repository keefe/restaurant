var AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'});

module.exports = function(event, context) {
    var newItem = {
        Item:{
          email:{
              S:"keefe@categorize.us"
          },
          firstName:{
              S:"keefe"
          },
          lastName:{
              S:"roedersheimer"
          },
          userMessage:{
              S:"Test Message"
          }
        },
        TableName:'UserLeads'
    };
    if(event.firstName!==undefined && event.firstName !=='') newItem.Item.firstName.S = event.firstName;
    if(event.lastName!==undefined && event.lastName !=='') newItem.Item.lastName.S = event.lastName;
    if(event.email!==undefined && event.email!=='') newItem.Item.email.S = event.email;
    if(event.userMessage!==undefined && event.userMessage!=='') newItem.Item.userMessage.S = event.userMessage;
    
    var dynamo = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    dynamo.putItem(newItem, function(err, data){
       if(err){
           console.log(err, err.stack);
           context.fail(err);
       }else{
            console.log(data);
            context.succeed(data);
       }
    });
};

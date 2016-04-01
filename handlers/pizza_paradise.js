var AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'});

module.exports = function(event, context) {
    var newItem = {
        Item:{
          cust_data:{
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
          },
          hasCheese:{
            BOOL:false
          },
          hasMushrooms:{
            BOOL:false
          },
          hasPepperoni:{
            BOOL:false
          }
        },
        TableName:'pizza_paradise'
    };
    if(event.firstName!==undefined && event.firstName !=='') newItem.Item.firstName.S = event.firstName;
    if(event.lastName!==undefined && event.lastName !=='') newItem.Item.lastName.S = event.lastName;
    if(event.email!==undefined && event.email!=='') newItem.Item.cust_data.S = event.email;
    if(event.userMessage!==undefined && event.userMessage!=='') newItem.Item.userMessage.S = event.userMessage;
    if(event.hasCheese!==undefined && event.hasCheese !=='') newItem.Item.hasCheese.BOOL = event.hasCheese;
    if(event.hasMushrooms!==undefined && event.hasMushrooms !=='') newItem.Item.hasMushrooms.BOOL = event.hasMushrooms;
    if(event.hasPepperoni!==undefined && event.hasPepperoni !=='') newItem.Item.hasPepperoni.BOOL = event.hasPepperoni;
    
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

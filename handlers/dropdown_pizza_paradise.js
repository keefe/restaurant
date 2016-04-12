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
          drpTraditional:{
             S:"Traditional"
          },
          hasClassicRed:{
            BOOL:false
          },
          hasCreamyGarlicWhite:{
            BOOL:false
          },
          hasExtraCheese:{
            BOOL:false
          },
          hasRegularCheese:{
            BOOL:false
          },
          hasNoCheese:{
            BOOL:false
          },
          hasPepperoni:{
            BOOL:false
          },
          hasItalianSausage:{
            BOOL:false
          },
          hasHam:{
            BOOL:false
          },
          hasSalami:{
            BOOL:false
          },
          hasBeef:{
            BOOL:false
          },
          hasBacon:{
            BOOL:false
          },
          hasChicken:{
            BOOL:false
          },
          hasCanadianBacon:{
            BOOL:false
          },
          hasMushrooms:{
            BOOL:false
          },
          hasOnions:{
            BOOL:false
          },
          hasBellPeppers:{
            BOOL:false
          },
          hasOlives:{
            BOOL:false
          },
          hasTomatoes:{
            BOOL:false
          },
          hasGarlic:{
            BOOL:false
          },
          hasJalapenos:{
            BOOL:false
          },
          hasArtichokes:{
            BOOL:false
          }
        },
        TableName:'pizza_paradise'
    };
    if(event.firstName!==undefined && event.firstName !=='') newItem.Item.firstName.S = event.firstName;
    if(event.lastName!==undefined && event.lastName !=='') newItem.Item.lastName.S = event.lastName;
    if(event.email!==undefined && event.email!=='') newItem.Item.cust_data.S = event.email;
    if(event.userMessage!==undefined && event.userMessage!=='') newItem.Item.userMessage.S = event.userMessage;
    if(event.hasTraditional!==undefined && event.hasTraditional !=='') newItem.Item.hasTraditional.BOOL = event.hasTraditional;
    if(event.hasThin!==undefined && event.hasThin !=='') newItem.Item.hasThin.BOOL = event.hasThin;
    if(event.hasGlutenFree!==undefined && event.hasGlutenFree !=='') newItem.Item.hasGlutenFree.BOOL = event.hasGlutenFree;
    if(event.hasClassicRed!==undefined && event.hasClassicRed !=='') newItem.Item.hasClassicRed.BOOL = event.hasClassicRed;
    if(event.hasCreamyGarlicWhite!==undefined && event.hasCreamyGarlicWhite !=='') newItem.Item.hasCreamyGarlicWhite.BOOL = event.hasCreamyGarlicWhite;
    if(event.hasExtraCheese!==undefined && event.hasExtraCheese !=='') newItem.Item.hasExtraCheese.BOOL = event.hasExtraCheese;
    if(event.hasRegularCheese!==undefined && event.hasRegularCheese !=='') newItem.Item.hasRegularCheese.BOOL = event.hasRegularCheese;
    if(event.hasNoCheese!==undefined && event.hasNoCheese !=='') newItem.Item.hasNoCheese.BOOL = event.hasNoCheese;
    if(event.hasPepperoni!==undefined && event.hasPepperoni !=='') newItem.Item.hasPepperoni.BOOL = event.hasPepperoni;
    if(event.hasItalianSausage!==undefined && event.hasItalianSausage !=='') newItem.Item.hasItalianSausage.BOOL = event.hasItalianSausage;
    if(event.hasHam!==undefined && event.hasHam !=='') newItem.Item.hasHam.BOOL = event.hasHam;
    if(event.hasSalami!==undefined && event.hasSalami !=='') newItem.Item.hasSalami.BOOL = event.hasSalami;
    if(event.hasBeef!==undefined && event.hasBeef !=='') newItem.Item.hasBeef.BOOL = event.hasBeef;
    if(event.hasBacon!==undefined && event.hasBacon !=='') newItem.Item.hasBacon.BOOL = event.hasBacon;
    if(event.hasChicken!==undefined && event.hasChicken !=='') newItem.Item.hasChicken.BOOL = event.hasChicken;
    if(event.hasCanadianBacon!==undefined && event.hasCanadianBacon !=='') newItem.Item.hasCanadianBacon.BOOL = event.hasCanadianBacon;
    if(event.hasMushrooms!==undefined && event.hasMushrooms !=='') newItem.Item.hasMushrooms.BOOL = event.hasMushrooms;
    if(event.hasOnions!==undefined && event.hasOnions !=='') newItem.Item.hasOnions.BOOL = event.hasOnions;
    if(event.hasBellPeppers!==undefined && event.hasBellPeppers !=='') newItem.Item.hasBellPeppers.BOOL = event.hasBellPeppers;
    if(event.hasOlives!==undefined && event.hasOlives !=='') newItem.Item.hasOlives.BOOL = event.hasOlives;
    if(event.hasTomatoes!==undefined && event.hasTomatoes !=='') newItem.Item.hasTomatoes.BOOL = event.hasTomatoes;
    if(event.hasGarlic!==undefined && event.hasGarlic !=='') newItem.Item.hasGarlic.BOOL = event.hasGarlic;
    if(event.hasJalapenos!==undefined && event.hasJalapenos !=='') newItem.Item.hasJalapenos.BOOL = event.hasJalapenos;
    if(event.hasArtichokes!==undefined && event.hasArtichokes !=='') newItem.Item.hasArtichokes.BOOL = event.hasArtichokes;
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

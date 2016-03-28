console.log('Loading event');
            
module.exports = function(event, context) {
  var clients = {}
  clients['katie'] = {
    firstName:'Kate',
    lastName:'Roedersheimer',
    phone:'redacted'
  };
  var firstName = (event.firstName === undefined ? 'No-Name' : event.firstName);
  var lastName = (event.lastName === undefined ? 'No-Name' : event.lastName);
  var name = firstName+" "+lastName;
  console.log('"Hello":"' + name + '"');
  context.done(null, {"Hello":name, "LastName":lastName, "data":clients[firstName]}); // SUCCESS with message
};
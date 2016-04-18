var express = require('express');
var bodyParser = require('body-parser');
var contactHandler = require('./handlers/contact_form')
var pizzaParadise = require('./handlers/pizza_paradise')
var dropdownPizzaParadise = require('./handlers/dropdown_pizza_paradise')
var helloHandler = require('./handlers/hello')

var app = express();
app.use(bodyParser.json());
app.use(express.static('static'));


var ContextProxy = function(req,res){
	this.req = req;
	this.res = res;
}
ContextProxy.prototype.succeed = function(data){
	this.res.status(200).send(data);
}
ContextProxy.prototype.fail = function(err){
  this.res.status(500).send(err);
}
ContextProxy.prototype.done = function(err, data){
  this.res.status(200).send(data);
}

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/dynamo', function(req, res){
  console.log("Inside Dynamo")
  console.log(req.body);
  context = new ContextProxy(req, res);
  contactHandler(req.body, context);
});
app.post('/pizzaParadise', function(req, res){
  console.log("Inside Dynamo")
  console.log(req.body);
  context = new ContextProxy(req, res);
  pizzaParadise(req.body, context);
});

app.post('/dropdownPizzaParadise', function(req, res){
  console.log("Inside Dynamo")
  console.log(req.body);
  context = new ContextProxy(req, res);
  dropdownPizzaParadise(req.body, context);
});

app.post('/testing', function(req, res){
  console.log("Inside Testing")
  console.log(req.body);
  context = new ContextProxy(req, res);
  helloHandler(req.body, context);
});

app.post('/test', function(req, res){
	console.log(req.body);
	res.status(200).send("ok");
});

app.listen(3030, function () {
  console.log('Example app listening on port 3030!');
});

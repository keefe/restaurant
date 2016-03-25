var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var ContextProxy = function(req,res){
	this.req = req;
	this.res = res;
}
ContextProxy.prototype.succeed = function(data){
	res.status(200).send(data);
}
ContextProxy.prototype.fail = function(err){

}

ContextProxy.succeed = function(data){

}

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/test', function(req, res){
	console.log(req.body);
	res.status(200).send("ok");
});

app.listen(3030, function () {
  console.log('Example app listening on port 3030!');
});

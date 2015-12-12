var express     = require('express');
var path        = require('path');
var app         = express();

app.use(express.static(path.join(__dirname, 'client/static')))

app.listen(8000, function(req, res){
  console.log("******************");
  console.log("*******8000*******");
  console.log("******************");
});

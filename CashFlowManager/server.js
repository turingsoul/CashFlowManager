var express = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

var app = express();

app.use(serveStatic('./', {'index': ['index.html']}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/asd', function(req, res){
   console.log(req.body);
   res.status(200);
   res.send('接收成功');
   
});

app.listen(8081);
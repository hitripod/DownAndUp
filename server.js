
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , down = require('./routes/down')
  , http = require('http')
  , https = require('https')
  , fs = require('fs')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.cookieParser('downAndUp'));
  app.use(express.session());
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/editor', down.index);
app.get('/down', down.convert);
//app.get('/login', down.login);

app.post('/down', function(req, res) {
    down.convert(req, res);
});

var options = {
    key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem'))
};

http.createServer( app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
//https.createServer(options, app).listen('443', function(){
//    console.log("Express server listening on port " + app.get('port'));
//});

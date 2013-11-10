
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
  app.set('port', process.env.PORT || 443);
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

/*
app.post('/file-upload', function(req, res, next) {
    console.log(req.body);
    console.log(req.files);
});
*/

///*
// we need the fs module for moving the uploaded files
//var fs = require('fs');
//app.post('/file-upload', function(req, res) {
/*
    console.log(req.body);
    console.log(req.files);
    // get the temporary location of the file
    var tmp_path = req.files.thumbnail.path;
    console.log(tmp_path);
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = './public/images/' + req.files.thumbnail.name;
    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
        });
    });
*/
//});
//*/

///*
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on  port " + app.get('port'));
});
//*/


//everyauth.helpExpress(app);
/*
var options = {
    key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem'))
};

https.createServer(options, app).listen('443', function(){
    console.log("Express server listening on port " + app.get('port'));
});
//http.createServer(app).listen(app.get('port'), function(){
//  console.log("Express server listening on port " + app.get('port'));
//});

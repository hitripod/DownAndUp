
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
  , path = require('path')
  , conf = require('./conf')
  , everyauth = require('everyauth');

everyauth.debug = true;
everyauth.everymodule
  .findUserById( function (id, callback) {
    callback(null, usersById[id]);
  });

everyauth
  .facebook
    .appId(conf.fb.appId)
    .appSecret(conf.fb.appSecret)
    .findOrCreateUser( function (session, accessToken, accessTokenExtra, fbUserMetadata) {
      return usersByFbId[fbUserMetadata.id] ||
        (usersByFbId[fbUserMetadata.id] = addUser('facebook', fbUserMetadata));
    })
    .redirectPath('/');

everyauth
  .dropbox
    .consumerKey(conf.dropbox.consumerKey)
    .consumerSecret(conf.dropbox.consumerSecret)
    .findOrCreateUser( function (sess, accessToken, accessSecret, dropboxUserMetadata) {
      return usersByDropboxId[dropboxUserMetadata.uid] ||
        (usersByDropboxId[dropboxUserMetadata.uid] = addUser('dropbox', dropboxUserMetadata));
    })
    .redirectPath('/');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 80);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  //app.use(express.bodyParser());
  //app.use(express.cookieParser('mr ripley'));
  app.use(express.cookieParser('downAndUp'));
  app.use(express.session());
  app.use(everyauth.middleware());

});

app.configure('development', function(){
  app.use(express.errorHandler());
});
/*
app.configure( function () {
  app.set('view engine', 'jade');
  app.set('views', everyauthRoot + '/example/views');
});
*/
app.get('/', routes.index);
/*
aapp.get('/', function (req, res) {
  res.render('home');
});
*/
app.get('/editor', down.index);
app.get('/down', down.convert);

app.use(express.bodyParser());
app.post('/down', function(req, res) {
    down.convert(req, res);
});

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
//https.createServer(options, app).listen(app.get('port'), function(){
//  console.log("Express server listening on port " + app.get('port'));
//});
//*/

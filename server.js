
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
  //, conf = require('./conf')
  //, everyauth = require('everyauth');
/*
everyauth.debug = true;
var usersById = {};
everyauth.everymodule
  .findUserById( function (id, callback) {
    callback(null, usersById[id]);
  });
  
var nextUserId = 0;
function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

var usersByFbId = {};
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
*/
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
  //app.use(everyauth.middleware());
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
app.get('/', function (req, res) {
  console.log(req.user);
  res.render('login');
});
/
/*
app.get('/', function (req, res) {
  res.render('home');
});
*/
app.get('/editor', down.index);
app.get('/down', down.convert);
app.get('/login', down.login);

//app.use(express.bodyParser());
app.post('/down', function(req, res) {
    down.convert(req, res);
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on  port " + app.get('port'));
});
//*/
//https.createServer(options, app).listen(app.get('port'), function(){
//  console.log("Express server listening on port " + app.get('port'));
//});
//*/

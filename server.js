
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
  , passport = require('passport')
  , util = require('util')
  , DropboxStrategy = require('passport-dropbox').Strategy;

//var DROPBOX_APP_KEY = "--insert-dropbox-app-key-here--"
//var DROPBOX_APP_SECRET = "--insert-dropbox-app-secret-here--";

var DROPBOX_APP_KEY = "8927n1gidx5s9kr"
var DROPBOX_APP_SECRET = "mm7vqtligthgh0n";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
/*
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
*/
passport.use(new DropboxStrategy({
    consumerKey: DROPBOX_APP_KEY,
    consumerSecret: DROPBOX_APP_SECRET,
    //callbackURL: "http://127.0.0.1:3000/auth/dropbox/callback"
    callbackURL: "http://127.0.0.1:80/auth/dropbox/callback"
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Dropbox profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the Dropbox account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));


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
  //app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  //app.use(express.bodyParser());
  //app.use(express.cookieParser('mr ripley'));
  app.use(express.cookieParser('downAndUp'));
  //app.use(express.session());
  app.use(express.session({ secret: 'keyboard cat' }));
  //app.use(express.session({ secret: 'skwp$^f9fw32[p-' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
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
app.get('/', function(req, res){
  //res.render('index', { user: req.user });
  res.render(routes.index, { user: req.user });
});
*/
app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.get('/auth/dropbox',
  passport.authenticate('dropbox'),
  function(req, res){
    // The request will be redirected to Dropbox for authentication, so this
    // function will not be called.
  });

app.get('/auth/dropbox/callback',
  passport.authenticate('dropbox', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});









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


/*
var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
*/
///*
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on  port " + app.get('port'));
});
//*/
//https.createServer(options, app).listen(app.get('port'), function(){
//  console.log("Express server listening on port " + app.get('port'));
//});
//*/

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

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
//  , conf = require('./conf')
//  , everyauth = require('everyauth');
//  , passport = require('passport')
//  , util = require('util')
//  , DropboxStrategy = require('passport-dropbox').Strategy;

//var DROPBOX_APP_KEY = "--insert-dropbox-app-key-here--"
//var DROPBOX_APP_SECRET = "--insert-dropbox-app-secret-here--";
///*
//var DROPBOX_APP_KEY = "8927n1gidx5s9kr"
//var DROPBOX_APP_SECRET = "mm7vqtligthgh0n";

/*
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username, password: password }, function (err, user) {
      done(err, user);
    });
  }
));
*/

/*
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new DropboxStrategy({
    consumerKey: DROPBOX_APP_KEY,
    consumerSecret: DROPBOX_APP_SECRET,
    //callbackURL: "http://127.0.0.1:3000/auth/dropbox/callback"
    callbackURL: "http://localhost//auth/dropbox/callback"
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
*/
//*/

  //, conf = require('./conf')
  //, everyauth = require('everyauth');
///*
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
var usersByDropboxId = {};

everyauth.dropbox
  .entryPath('/auth/dropbox')
  .callbackPath('/auth/dropbox/callback');

everyauth
  .facebook
    .appId(conf.fb.appId)
    .appSecret(conf.fb.appSecret)
    .findOrCreateUser( function (session, accessToken, accessTokenExtra, fbUserMetadata) {
      return usersByFbId[fbUserMetadata.id] ||
        (usersByFbId[fbUserMetadata.id] = addUser('facebook', fbUserMetadata));
    })
    .redirectPath('/');
//*/
/*
everyauth
  .dropbox
    .consumerKey(conf.dropbox.consumerKey)
    .consumerSecret(conf.dropbox.consumerSecret)
    //.entryPath('/auth/dropbox')
    //.callbackPath('/auth/dropbox/callback')
    .findOrCreateUser( function (sess, accessToken, accessSecret, dropboxUserMetadata) {
      console.log(sess);
      console.log(accessToken);
      console.log(accessSecret);
      console.log(dropboxUserMetadata);
      return usersByDropboxId[dropboxUserMetadata.uid] ||
        (usersByDropboxId[dropboxUserMetadata.uid] = addUser('dropbox', dropboxUserMetadata));
    })
    .redirectPath('/');
*/
//*/
/*
everyauth.dropbox
  .entryPath('/auth/dropbox')
  .callbackPath('/auth/dropbox/callback');
*/
//everyauth.dropbox.configurable();


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 80);
  //app.set('port', process.env.PORT || 443);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  //app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(express.bodyParser({uploadDir:'./public/uploads'}));
  //app.use(express.bodyParser());
  //app.use(express.cookieParser('mr ripley'));
  //app.use(express.cookieParser('downAndUp'));
  //app.use(express.static(__dirname + '/../public'));
  app.use(express.session());
  //app.use(everyauth.middleware(app));
  //app.use(express.session({ secret: 'keyboard cat' }));
  //app.use(express.session({ secret: 'skwp$^f9fw32[p-' }));
  //app.use(passport.initialize());
  //app.use(passport.session());
  //app.use(app.router);
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
/*
app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
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
*/


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
//app.get('/down', down.convert);
//app.get('/login', down.login);

//app.use(express.bodyParser());
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
var fs = require('fs');
app.post('/file-upload', function(req, res) {
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
});
//*/

///*
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on  port " + app.get('port'));
});
//*/


//everyauth.helpExpress(app);
/*
var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
//*/


/*
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
*/
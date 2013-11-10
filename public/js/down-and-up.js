//function selectText(element) {
//    var doc = document;
//    var text = doc.getElementById(element);    
//
//    if (doc.body.createTextRange) { // ms
//        var range = doc.body.createTextRange();
//        range.moveToElementText(text);
//        range.select();
//    } else if (window.getSelection) { // moz, opera, webkit
//        var selection = window.getSelection();            
//        var range = doc.createRange();
//        range.selectNodeContents(text);
//        selection.removeAllRanges();
//        selection.addRange(range);
//    }
//}
//
//window.onload = function() {
//    $('code').contents().unwrap();
//    selectText('outputBlock');
//    alert("hi");
//}
var showError = function(error) {
  switch (error.status) {
  case Dropbox.ApiError.INVALID_TOKEN:
    // If you're using dropbox.js, the only cause behind this error is that
    // the user token expired.
    // Get the user through the authentication flow again.
    console.log("invalid token");
    break;

  case Dropbox.ApiError.NOT_FOUND:
    // The file or folder you tried to access is not in the user's Dropbox.
    // Handling this error is specific to your application.
    console.log("not found");
    break;

  case Dropbox.ApiError.OVER_QUOTA:
    // The user is over their Dropbox quota.
    // Tell them their Dropbox is full. Refreshing the page won't help.
    console.log("over quota");
    break;

  case Dropbox.ApiError.RATE_LIMITED:
    // Too many API requests. Tell the user to try again later.
    // Long-term, optimize your code to use fewer API calls.
    console.log("rate limited");
    break;

  case Dropbox.ApiError.NETWORK_ERROR:
    // An error occurred at the XMLHttpRequest layer.
    // Most likely, the user's network connection is down.
    // API calls will not succeed until the user gets back online.
    console.log("network error");
    break;

  case Dropbox.ApiError.INVALID_PARAM:
    console.log("invalid param");
  case Dropbox.ApiError.OAUTH_ERROR:
    console.log("oauth error");
  case Dropbox.ApiError.INVALID_METHOD:
    console.log("invlaid method");
  default:
    console.log("caused by a bug in dropbox.js");
    console.log(error);
    console.log(error.status);
    // Caused by a bug in dropbox.js, in your application, or in Dropbox.
    // Tell the user an error occurred, ask them to refresh the page.
  }
};

function random_string() {
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    var s = '';
    for (var i = 0; i < 22; i++) {
        s += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return s;
}

var dbkey        = 'iuaoivawhqzqxrz';
//var redirect_uri = 'http://localhost:8000/editor/';
//var redirect_uri = 'https://localhost/editor/';
var redirect_uri = "https://quick-hitter.2013.nodeknockout.com/editor/";
var client = new Dropbox.Client({ key: dbkey });

$(document).ready(function(){
    $('#dropbox-log-in').click(function(){
        var csrf = random_string();
        //cookie.set('csrf', csrf);
        
        window.location = 'https://www.dropbox.com/1/oauth2/authorize?client_id='
            + encodeURIComponent(dbkey)
            + '&state=' + encodeURIComponent(csrf)
            + '&response_type=token&redirect_uri=' + encodeURIComponent(redirect_uri);
        //client.authDriver(new Dropbox.AuthDriver.Popup({
        //    receiverUrl: redirect_uri}));
        ////client.authorize();
        
        client.authenticate(function(error, client) {
            alert("auth");
          if (error) {
            // Replace with a call to your own error-handling code.
            //
            // Don't forget to return from the callback, so you don't execute the code
            // that assumes everything went well.
            return showError(error);
          }
        
          // Replace with a call to your own application code.
          //
          // The user authorized your app, and everything went well.
          // client is a Dropbox.Client instance that you can use to make API calls.
          //doSomethingCool(client);
        });
    });
    document.getElementById("db-chooser").addEventListener("DbxChooserSuccess",
        function(e) {
            alert("Here's the chosen file: " + e.files[0].link)
            client.writeFile("hello_world.txt", "Hello, world!\n", function(error, stat) {
              if (error) {
                return showError(error);  // Something went wrong.
              }
            
              alert("File saved as revision " + stat.revisionTag);
            });
        }, false
    );

    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo(document.body);
            });
        }
    });

});


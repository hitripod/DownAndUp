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
    console.log("The user token might be expired: invalid token");
    authDropbox();
    break;

  case Dropbox.ApiError.NOT_FOUND:
    console.log("The file or folder not found");
    break;

  case Dropbox.ApiError.OVER_QUOTA:
    console.log("Dropbox over quota");
    break;

  case Dropbox.ApiError.RATE_LIMITED:
    console.log("Too many API requests: rate limited");
    break;

  case Dropbox.ApiError.NETWORK_ERROR:
    console.log("XMLHttpRequest or user's network connection is down: network error");
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


var db_core    = 'iuaoivawhqzqxrz'; // App Key
var db_dropins = '8927n1gidx5s9kr';
//var redirect_uri = 'http://localhost:8000/editor/';
//var redirect_uri = 'https://localhost/editor/';
var redirect_uri = "https://quick-hitter.2013.nodeknockout.com/editor/";
var client = new Dropbox.Client({ key: db_core });

var authDropbox = function() {
    var csrf = random_string();
    //cookie.set('csrf', csrf);
    window.location = 'https://www.dropbox.com/1/oauth2/authorize?client_id='
       + encodeURIComponent(db_core)
       + '&state=' + encodeURIComponent(csrf)
       + '&response_type=token&redirect_uri=' + encodeURIComponent(redirect_uri);
};

var logoutDropbox = function() {
    return client.signOut(function(error) {
        if (error) {
            return showError(error);
        }
        return window.location.reload();
    });
};

var dbWriteFile = function(filename, content) {
    client.authenticate(function(error, client) {
        if (error) 
            return showError(error);  
        client.getAccountInfo(function(error, accountInfo) {
            if (error) 
                return showError(error);  
            console.log(accountInfo.name);
        });
        client.writeFile(filename, content, function(error, stat) {
            if (error) 
                return showError(error);  
        });
    });
}

var dbReadFile = function(filename) {
    client.authenticate(function(error, client) {
        if (error) 
            return showError(error); 
        client.getAccountInfo(function(error, accountInfo) {
            if (error) 
                return showError(error);  
            console.log(accountInfo.name);
        });
        client.readFile(filename, function(error, data) {
            if (error) 
                return showError(error);  
            CKEDITOR.instances.editor.setData(data);
        });
    });
}

var filenameToSave = "DownAndUp";
var saveToDropbox = function() {
    var file = filenameToSave+".txt";
    console.log(file);

    options = {
        files: [
            {
                'filename': file,
                'url': 'https://dl.dropboxusercontent.com/u/3968081/DownAndUp.txt' 
            }
        ],
        success: function() {},
        progress: function(progress) {},
        cancel: function() {},
        error: function(err) {}
    }
    dbWriteFile(file, CKEDITOR.instances.editor.getSnapshot());
    $('.dropbox-saver').attr('data-filename', file);
    Dropbox.save(options);
};


var loadFromDropbox = function(e) {
    var match = e.files[0].link.match(/\w+.txt$/);
    if (match == null){
        alert("Invlid file. lease select Dropbox/App/DownAndUp/*.txt(Use DownAndUp.txt as the default.)");
        dbReadFile("DownAndUp.txt");
        return;
    }
    var file = match[0];
    console.log(file);
    dbReadFile(file);
};

$(document).ready(function(){
    /*
    client.authenticate(function(error, client) {
        if (error) { 
            $('#dropboxUser').html('Dropbox <b class="caret"></b>');
            return showError(error);  
        }
        client.getAccountInfo(function(error, accountInfo) {
            if (error)  
                return showError(error);  
            $('#dropboxUser').html(accountInfo.name + '<b class="caret"></b>');
        });
    });
*/
    $('#dropbox-log-in').click(authDropbox);
    $('#dropbox-log-out').click(logoutDropbox);
    $('.dropbox-saver').click(saveToDropbox);
    document.getElementById("db-chooser").
        addEventListener("DbxChooserSuccess", function(e){loadFromDropbox(e);}, false);
    $('#windowTitleDialog').bind('show', function () {
        document.getElementById ("xlInput").value = document.title;
    });

    $('#modalOK').click(function () {
        filenameToSave = $('input#modalFilename').val();
        $('#askForTitle').modal('hide');
    });
    $('#askForTitle').on('shown.bs.modal', function () {
        $('input#modalFilename').select();
    });
});

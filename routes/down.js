exports.index = function(req, res){

    var fs = require('fs');
    var path = require('path');
    var example = fs.readFileSync(path.join(__dirname, '../public/') + 'static/example.html','utf8')
    example = encodeURIComponent(example);
    res.render('editor', {output: example});
};

exports.convert = function(req, res){

    var marked = require("marked");
    var hljs   = require("highlight.js");
    var http   = require('http');
    //var rawHtml;

    marked.setOptions({
        highlight: function (code, lang) {
            return hljs.highlightAuto(code).value;
        }
    });

    //var testCode = "## Heading2 \n\n_Hello_ **World**!\n```\nint main() \n{\n\tint a = 1+2;\n\treturn 0;\n}\n```";
    //var rawHtml =  marked(testCode);

    //rawHtml =  marked(req.query.source); // HTTP GET
    var input = decodeURIComponent(req.body.source);// HTTP POST

    //var strSent = strModified.replace('<pre><code>', '');
            //strSent = strSent.replace('</code></pre>', '');


            
    var markedInput = marked(input);
    res.send(markedInput);
    //var rawHtml = '<pre><code>' + markedInput + '</code></pre>';
    //res.send(rawHtml);
};

exports.login = function(req, res){
    res.render('login', {res: res});
};

exports.index = function(req, res){
    res.render('editor');
};

exports.convert = function(req, res){

    var marked = require("marked");
    var hljs   = require("highlight.js");
    var http   = require('http');
    var rawHtml;

    marked.setOptions({
        highlight: function (code, lang) {
            return hljs.highlightAuto(code).value;
        }
    });

    var testCode = "## Heading2 \n\n_Hello_ **World**!\n```\nint main() \n{\n\tint a = 1+2;\n\treturn 0;\n}\n```";
    var rawHtml =  marked(testCode);

    //var rawHtml =  marked(req.body.source);
    console.log(rawHtml);
    res.send(rawHtml);
};

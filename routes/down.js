exports.convert = function(req, res){

    var marked = require("marked");
    var hljs   = require("highlight.js");
    var http   = require('http');
    var rawHtml;

    marked.setOptions({
        highlight: function (code, lang) {

            //var bodySource = req.body.source;
            //var codeHtml;
            //var bCompleted = false;

            //var req = http.get('http://markup.su/api/highlighter?language=C&theme=Sunburst&source='+encodeURIComponent(bodySource), function(resp){
            //    resp.on('data', function(chunk){ codeHtml += chunk; });
            //    resp.on('end', function() { console.log(codeHtml); } );
            //}).on("error", function(e){
            //    console.log("Got error: " + e.message);
            //});
            return hljs.highlightAuto(code).value;
        }
    });

    //var testCode = "## Heading2 \n\n_Hello_ **World**!\n```\nint main() \n{\n\tint a = 1+2;\n\treturn 0;\n}\n```";
    //var rawHtml =  marked(testCode);

    var rawHtml =  marked(req.body.source);
    console.log(rawHtml);
    res.render('down', { output: rawHtml });
};

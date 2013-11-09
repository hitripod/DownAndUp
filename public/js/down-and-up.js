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

$(document).ready(function(){
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo(document.body);
            });
        }
    });
});


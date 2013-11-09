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
//}

//var AppView = Backbone.View.extend({
//  // el - stands for element. Every view has a element associate in with HTML 
//  //      content will be rendered.
//  el: 'body',
//  // It's the first function called when this view it's instantiated.
//  initialize: function(){
//    this.render();
//  },
//  // $el - it's a cached jQuery object (el), in which you can use jQuery functions 
//  //       to push content. Like the Hello World in this case.
//  render: function(){
//    this.$el.html("Hello World");
//  }
//});

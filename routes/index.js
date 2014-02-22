require('nko')('rCHfaWaeKPfJgPZm');

exports.index = function(req, res){
  var ko = '<iframe width="560" height="315" src="//www.youtube.com/embed/zkA1ZLJV5Xw?list=UUAsnSEKr8qw-dYHgV8H6Yig" frameborder="0" allowfullscreen></iframe>';
  ko = '<html><body>' + ko + '</body></html>\n';
  res.render('index', { title: 'DownAndUp', voteko: ko, user: req.user });
};

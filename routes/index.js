require('nko')('rCHfaWaeKPfJgPZm');

exports.index = function(req, res){
  var ko = '<iframe src="https://nodeknockout.com/iframe/quick-hitter" frameborder=0 scrolling=no allowtransparency=true width=115 height=25></iframe>';
  ko = '<html><body>' + ko + '</body></html>\n';
  res.render('index', { title: 'DownAndUp', voteko: ko, user: req.user });
};

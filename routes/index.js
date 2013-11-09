require('nko')('rCHfaWaeKPfJgPZm');

exports.index = function(req, res){
  var ko = '<iframe src="http://nodeknockout.com/iframe/quick-hitter" frameborder=0 scrolling=no allowtransparency=true width=115 height=25></iframe>';
  ko = '<html><body>' + ko + '</body></html>\n';
  console.log("kordan...");
  res.render('index', { title: 'DownAndUp', voteko: ko });
};

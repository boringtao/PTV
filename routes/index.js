module.exports = function(app) {
	app.get('/', function(req, res){
	  res.render('index.jade');
	});
	app.get('/category/:cid', function(req, res){
		var cid = req.params.cid;
		console.log(cid);
	  res.render('videos.jade');
	});
	app.get('/video/:vid', function(req, res){
		var vid = req.params.vid;
		console.log(vid);
	  res.render('video.jade');
	});
	app.post('/video', function(req, res){
	  
	});
	app.put('/video/:vid', function(req, res){
	  
	});
	app.delete('/video/:vid', function(req, res){
	  
	});

}

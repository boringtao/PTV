module.exports = function (app, passport) {

	var Video = require('../app/models/video');

	app.get('/category/:cid', function(req, res, next){
		console.log(req.isAuthenticated());
		var cid = req.params.cid;
		Video.
		    find().
		    exec(function (err, videos) {
		      if(err) return next(err);
		      res.render( 'videos', {
		          videos: videos,
		          member: req.user
		      });
		    });
    });
	app.get('/video/:vid', function(req, res, next){
		Video.
		    findById(req.params.vid).
		    exec(function (err, video) {
		      if(err) return next(err);
		      if (req.isAuthenticated()) {
		      	var uid = req.user.id;
		      	var collectors = video.collectors;
		      	var collected = (collectors.indexOf(uid) > -1 ? 1 : 0);
		      } else {
		      	console.log(req.user);
		      }
		      res.render( 'video', {
		          video: video,
		          member: req.user,
		          collected: collected
		      });
		    });
	});
	app.post('/create', function(req, res, next){
	  	new Video({
	  		name: req.body.name,
	  		cover: req.body.cover,
	  		intro: req.body.intro,
	      	video: req.body.video,	
      		collects: 0,
	      	collectors: []
	  	}).save(function(err, video, count) {
	    	if( err ) return next( err );
	    	res.redirect(req.headers.referer);
	  	});
	});
	app.post('/edit/:vid', function(req, res){
	  	Video.
		    findById(req.params.vid, function(err, video){
		    	video.name = req.body.name;
	  			video.cover = req.body.cover;
	  			video.intro = req.body.intro;
	      		video.video = req.body.video;
	      		video.save(function(err, video, count) {
	      			if( err ) return next( err );
	    			res.redirect( '/video/'+ req.params.vid);
	      		})
		    })
	});
	app.get('/delete/:vid', function(req, res){
	  	Video.
		    findById(req.params.vid, function (err, video) {
		    video.remove(function(err, video) {
      			if(err) return next(err);
      			res.redirect(req.headers.referer);
    		});
		});
	});
	app.get('/vote/:vid', function(req, res){
		Video.
		    update({_id: req.params.vid}, {$addToSet: {collectors: req.user.id}, $inc: {collects: 1}}, function (err, updated) {
		    	if( err ) console.log("Votes not updated");
  				else
  				res.redirect( '/video/'+ req.params.vid);
    		});
	});
}


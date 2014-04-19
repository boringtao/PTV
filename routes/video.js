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
		console.log(req.isAuthenticated());
		Video.
		    findById(req.params.vid).
		    exec(function (err, video) {
		      if(err) return next(err);
		      res.render( 'video', {
		          video: video,
		          member: req.user
		      });
		    });
	});
	app.post('/create', function(req, res, next){
	  	new Video({
	  		name: req.body.name,
	  		cover: req.body.cover,
	  		intro: req.body.intro,
	      	video: req.body.video
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
}


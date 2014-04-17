module.exports = function (app) {
	var mongoose = require('mongoose');
	var Videos = mongoose.model('Videos');

	app.get('/category/:cid', function(req, res, next){
		var cid = req.params.cid;
		Videos.
		    find().
		    exec(function (err, videos) {
		      if(err) return next(err);
		      res.render( 'videos', {
		          videos: videos
		      });
		    });
    });
	app.get('/video/:vid', function(req, res, next){
		Videos.
		    findById(req.params.vid).
		    exec(function (err, video) {
		      if(err) return next(err);
		      res.render( 'video', {
		          video: video
		      });
		    });
	});
	app.post('/create', function(req, res, next){
	  	new Videos({
	  		name: req.body.name,
	  		cover: req.body.cover,
	  		intro: req.body.intro,
	      	video: req.body.video
	  	}).save(function (err, video, count) {
	    	if( err ) return next( err );
	    	res.redirect(req.headers.referer);
	  	});
	});
	app.post('/edit/:vid', function(req, res){
	  	Videos.
		    findById(req.params.vid, function(err, video){
		    	video.name = req.body.name;
	  			video.cover = req.body.cover;
	  			video.intro = req.body.intro;
	      		video.video = req.body.video;
	      		video.save(function (err, video, count) {
	      			if( err ) return next( err );
	    			res.redirect( '/video/'+ req.params.vid);
	      		})
		    })
	});
	app.get('/delete/:vid', function(req, res){
	  	Videos.
		    findById(req.params.vid, function (err, video) {
		    video.remove( function (err, video) {
      			if(err) return next(err);
      			res.redirect(req.headers.referer);
    		});
		});
	});
}

module.exports = function (app, passport) {

	var Category = require('../app/models/category');
	var Province = require('../app/models/province');
	var Video = require('../app/models/video');
	
	var category = [];
	for(var index in Category) {
		category.push(Category[index]['name']);
	}
	var province = [];
	for(var index in Province) {
		province.push(Province[index]['name']);
	}
	app.get('/category/:cname', function(req, res, next){
		Video.
		    find({category: req.params.cname}).
		    exec(function (err, videos) {
		      if(err) return next(err);
		      res.render( 'videos', {
		          videos: videos,
		          category: category,
		          province: province,
		          member: req.user
		      });
		    });
    });
    app.get('/province/:pname', function(req, res, next){
		Video.
		    find({province: req.params.pname}).
		    exec(function (err, videos) {
		    	console.log(videos);
		      if(err) return next(err);
		      res.render( 'videos', {
		          videos: videos,
		          category: category,
		          province: province,
		          member: req.user
		      });
		    });
    });
    app.get('/collection', function(req, res, next){
		console.log(req.isAuthenticated());
		if (req.isAuthenticated() == true) {
			Video.
		    find({collectors: req.user.id}).
		    exec(function (err, videos) {
		      if(err) return next(err);
		      res.render( 'collection', {
		          videos: videos,
		          category: category,
		          province: province,
		          member: req.user
		      });
		    });
		} else {
			res.redirect('/login');
		}
		
    });
	app.get('/video/:vid', function(req, res, next){
		console.log(category);
		Video.
		    findById(req.params.vid).
		    exec(function (err, video) {
		      if(err) return next(err);
		      if (req.isAuthenticated()) {
		      	var uid = req.user.id;
		      	var collectors = video.collectors;
		      	var collected = (collectors.indexOf(uid) > -1 ? 1 : 0);
		      } else {
		      	console.log('Please log in');
		      }
		      res.render( 'video', {
		          video: video,
		          category: category,
		          province: province,
		          member: req.user,
		          collected: collected
		      });
		    });
	});
	app.post('/create', function(req, res, next){
	  	new Video({
	  		category: req.body.category,
	  		province: req.body.province,
	  		station: req.body.station,
	  		program: req.body.program,
	  		title: req.body.title,
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
		    	console.log(video);
		    	video.category = req.body.category;
	  			video.province = req.body.province;
	  			video.station = req.body.station;
		  		video.program = req.body.program;
		    	video.title = req.body.title;
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
	app.get('/collect/:vid', function(req, res){
		Video.
		    update({_id: req.params.vid}, {$addToSet: {collectors: req.user.id}, $inc: {collects: 1}}, function (err, updated) {
		    	if( err ) console.log("Collects not updated");
  				else
  				res.redirect( '/video/'+ req.params.vid);
    		});
	});
	app.get('/uncollect/:vid', function(req, res){
		Video.
		    update({_id: req.params.vid}, {$pull: {collectors: req.user.id}, $inc: {collects: -1}}, function (err, updated) {
		    	if( err ) console.log("Collects not updated");
  				else
  				res.redirect( '/video/'+ req.params.vid);
    		});
	});
}


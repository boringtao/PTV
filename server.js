
// node modules
var http = require('http');
var express = require('express');
var app = express();
var path = require('path');	

//stylus
var stylus = require('stylus');
function compile(str, path) {
  return stylus(str)
    .set('filename', path);
}

// congfigure
app.configure(function() {
	app.set('port', process.env.PORT || 8080);
	app.set('views', path.join(__dirname, 'server/views'));
	app.set('view engine', 'jade');

	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(function (req, res, next) {
		res.set('X-Powered-By', 'Propeller TV');
		next();
	});

	//public
	app.use(stylus.middleware({ 
	  	src: __dirname + '/public', 
	  	compile: compile
	}));
	app.use(express.static(path.join(__dirname, 'public')));

});

// mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://root:hh7357@ds053448.mongolab.com:53448/tv');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'conncetion error.'));
db.once('open', function callback() {
	console.log('database opened.');
});

var Schemas = {
	video: mongoose.Schema({
		category: String,
		province: [],
		station: String,
		program: String,
		title: String,
		cover: String,
		intro: String,
		video: String,
		collects: 0,
		collectors: []
	})
};

var Video = mongoose.model('Video', Schemas.video);

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/partials/:partialPath', function(req, res){
	res.render('partials/' + req.params.partialPath);
}); 

app.get('*', function(req, res){
  	res.render('index');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
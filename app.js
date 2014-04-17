module.exports = function (db) {
	var express = require('express');
	var path = require('path');	
	var app = express();
	var fs = require('fs');

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(function (req, res, next) {
		res.set('X-Powered-By', 'Propeller TV');
		next();
	});
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	fs.readdirSync('routes').forEach(function(file) {
	  if ( file[0] == '.' ) return;
	  var routeName = file.substr(0, file.indexOf('.'));
	  console.log(routeName);
	  require('./routes/' + routeName)(app);
	});
	app.get('/', function(req, res){
	  res.render('index.jade');
	});
	
	return app;
}

// node modules
var http = require('http');
var express = require('express');
var app = express();
var path = require('path');	
var fs = require('fs');

// mongoose
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

// passport
var passport = require('passport');
var flash = require('connect-flash');
require('./config/passport')(passport);

// congfigure
app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('view engine', 'jade');

	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());

	// passport configure
	app.use(express.session({ secret: 'boringtao' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

	app.use(express.static(path.join(__dirname, 'public')));
});

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

fs.readdirSync('routes').forEach(function(file) {
  if ( file[0] == '.' ) return;
  var routeName = file.substr(0, file.indexOf('.'));
  require('./routes/' + routeName)(app, passport);
});
app.get('/', function(req, res){
  	res.render('index.jade');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
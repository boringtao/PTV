var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Video = new Schema ({
	name: "String",
	cover: "String",
	intro: "String",
	video: "String"
});

mongoose.model('Videos', Video);

mongoose.connect('mongodb://root:hh7357@ds053448.mongolab.com:53448/tv');

module.exports = mongoose.connection;

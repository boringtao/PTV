var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
	name: "String",
	cover: "String",
	intro: "String",
	video: "String",
	collects: 0,
 	collectors: []
});

module.exports = mongoose.model('Video', videoSchema);

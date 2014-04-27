var mongoose = require('mongoose');

var schemas = {
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

module.exports = mongoose.model('Video', schemas.video);

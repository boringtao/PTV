var mongoose = require('mongoose');

mongoose.connect('mongodb://root:hh7357@ds053448.mongolab.com:53448/tv');

module.exports = mongoose.connection;
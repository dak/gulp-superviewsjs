var path = require('path');
var through = require('through-gulp');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
var superviews = require("superviews.js");

// file can be a vinyl file object or a string
// when a string it will construct a new one
module.exports = function(file, opt) {
	opt = opt || {};
	// to preserve existing |undefined| behaviour and to introduce |newLine: ""| for binaries
	if (typeof opt.newLine !== 'string') {
		opt.newLine = '\n';
	}
	return through(function(file, encoding,callback) {
		if (file.isNull()) {}
		if (file.isBuffer()) {
			var templateFile = new Buffer(decoder.write(file.contents));
			templateFile = superviews(decoder.write(templateFile).replace(/[\n\t\r]/g," "));
			file.contents = new Buffer(templateFile);
		}
		if (file.isStream()) {}
		this.push(file);
		callback();
		}, function(callback) {
		callback();
	});
};

'use strict';

var gulp   	= require('gulp');
var config 	= require('../config');
var tar 	 	= require('tar-fs');
var zlib 		= require('zlib');
var fs 			= require('fs');

gulp.task('zlib', function() {

	return tar.pack('./', { entries: ['build'] })
	.pipe(zlib.Gzip()) /* Compress the .tar file */
	.pipe(fs.createWriteStream('build.tar.gz'));

});

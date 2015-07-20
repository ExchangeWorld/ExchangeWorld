'use strict';

var gulp = require('gulp');
var fs = require('fs');
var config = require('../config');
var Client = require('ssh2').Client;

gulp.task('deploy', [], function() {

	// Any deployment logic should go here
	var client = new Client();

	client.on('keyboard-interactive',function(name, instructions, instructionsLang, prompts, finish) {
		finish(['zcadqe1234']);
	})
	.on('ready', function() {
		console.log('Client :: ready');
		client.sftp(function(err, sftp) {
			var readStream = fs.createReadStream('build.tar.gz');
			var writeStream = sftp.createWriteStream('ExchangeWorld/build.tar.gz');
			writeStream.on('close',function() {
					console.log( "- file transferred" );
					sftp.end();
				}
			);

			readStream.pipe( writeStream );
		});

    client.exec('cd ~/ExchangeWorld', function(err, stream) {
      if (err) throw err;
      stream.on('close', function(code, signal) {
        console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
        stream.end();
      }).on('data', function(data) {
        console.log('STDOUT: ' + data);
      }).stderr.on('data', function(data) {
        console.log('STDERR: ' + data);
      });
  	});

    client.exec('tar xvzf build.tar.gz', function(err, stream) {
      if (err) throw err;
      stream.on('close', function(code, signal) {
        console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
        stream.end();
      }).on('data', function(data) {
        console.log('STDOUT: ' + data);
      }).stderr.on('data', function(data) {
        console.log('STDERR: ' + data);
      });
  	});

    client.exec('find . -type d -exec chmod 755 {} \\;', function(err, stream) {
      if (err) throw err;
      stream.on('close', function(code, signal) {
        console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
        client.end();
      }).on('data', function(data) {
        console.log('STDOUT: ' + data);
      }).stderr.on('data', function(data) {
        console.log('STDERR: ' + data);
      });
  	});
	})
  .connect({
		host: '140.119.68.14',
		port: 22,
		username: 'exwd',
		tryKeyboard: true // this attempts keyboard-interactive auth
	});
});

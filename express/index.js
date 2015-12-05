'use strict';

// var config       = require('../gulp/config');
var http         = require('http');
var https        = require('https');
var ssl          = require('../ssl/ssl');
var express      = require('express');
var gutil        = require('gulp-util');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var favicon      = require('serve-favicon');
var compression  = require('compression');
var useragent    = require('express-useragent');
var cp           = require('child_process');
var path         = require('path');

module.exports = function() {

	var server = express();

	// log all requests to the console
	if (process.env.NODE_ENV !== 'production') server.use(morgan('dev'));

	server.use(cookieParser());
	server.use(compression());
	server.use(useragent.express());

	server.use(favicon(path.resolve(__dirname, '../build/images/favicon.ico')));

	server.use(express.static('build'));

	server.disable('x-powered-by');

	server.all('*', (req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});

	// For bots
	server.use((req, res, next) => {
		if (req.useragent.isBot) {
			if (req.useragent.isBot.startsWith('facebook')) {
				// res.redirect('http://' + req.hostname + ':43002' + '/bot' + req.path);
				cp.exec('node ' + path.resolve(__dirname, '../../ExchangeWorld-API/ipc_child/bot.js') + ' ' + req.path, (error, stdout, stderr) => {
					if (error) {
						res.send(error);
					} else {
						res.send(stdout.toString());
					}
				});
			} else {
				console.log('BOT-AGENT:', req.useragent.isBot);
				next();
			}
		} else {
			next();
		}
	});

	server.all('*', (req, res, next) => {
		res.sendFile('index.html', {root: 'build'});
	});

	// Serve index.html for all routes to leave routing up to Angular
	// server.all(/^(?!\/api\/)\w*/, function(req, res, next) {
	// 	res.sendFile('index.html', { root : 'build' });
	// });

	// Catch 404 and forward to error handler
	server.use((req, res, next) => {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// 500 error handlers
	// Development error handler: print stacktrace
	server.use((err, req, res, next) => {
		res.status(err.status || 500);
		err.statusCode = 500;
		if (process.env.NODE_ENV !== 'production' && req.xhr) {
			res.send(err);
		} else if (req.xhr) {
			res.send(err.message);
		}

		next(err);
	});

	// Start webserver if not already running
	var s = http.createServer(server);
	s.on('error', err => {
		if (err.code === 'EADDRINUSE') {
			gutil.log('Development server is already started at port 80');
		} else {
			throw err;
		}
	});

	s.listen(80);

	var ss = https.createServer(ssl.options, server);
	ss.listen(443);
};

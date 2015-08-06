'use strict';

var config       = require('../gulp/config');
var http         = require('http');
var express      = require('express');
var gutil        = require('gulp-util');
var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon      = require('serve-favicon');
var compression  = require('compression');
var multer       = require('multer');

module.exports = function() {

	var server = express();

	// log all requests to the console
	if (process.env.NODE_ENV !== 'production') server.use(morgan('dev'));

	//server.use(favicon(__dirname + '/' + config.images.dest + '/favicon.ico'));
	server.use(bodyParser.json()); // for parsing application/json
	server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
	// server.use(multer()); // for parsing multipart/form-data
	server.use(cookieParser());
	server.use(compression());
	server.use(express.static(config.dist.root));

	// Serve index.html for all routes to leave routing up to Angular
	server.all(/^(?!\/api\/)\w*/, function(req, res, next) {
		res.sendFile('index.html', { root: 'build' });
	});

	//server.use('/', routeIndex);
	server.use('/api/seek', require('./routers/seek'));
	server.use('/api/goods', require('./routers/goods'));
	server.use('/api/profile', require('./routers/profile'));
	server.use('/api/exchange', require('./routers/exchange'));

	// catch 404 and forward to error handler
	server.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// 500 error handlers

	// development error handler: print stacktrace
	server.use(function(err, req, res, next) {
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
	s.on('error', function(err) {
		if (err.code === 'EADDRINUSE') {
			gutil.log('Development server is already started at port ' + config.serverPort);
		} else {
			throw err;
		}
	});

	s.listen(config.serverPort);

};

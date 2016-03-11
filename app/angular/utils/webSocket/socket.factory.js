'use strict';

const socketModule = require('./socket.module');
const _ = require('lodash');
const moment = require('moment');

socketModule.factory('socket', socket);

/** @ngInject */
function socket($timeout, exception, $localStorage, $rootScope, $q) {
	var socket = new WebSocket(`ws://exwd.csie.org:43002?token=${$localStorage.token}`);
	var dataStream = [];

	socket.onopen = function(evt) {
		console.log('connected', evt);
	};
	
	socket.onclose = function(evt) {
		console.log('closed', evt);
	};
	
	socket.onmessage = function(evt) {
		console.log('receive', evt);
		$timeout(()=> {
			var data = JSON.parse(evt.data);
			if (data.error) return;

			broadcast(data);
		});
	};

	socket.onerror = function(evt) {
		console.log('error', evt);
	};

	async function send(stringifyJSON) {
		const defer = $q.defer();

		try {
			await socket.send(stringifyJSON);
			defer.resolve('done');
		} catch (err) {
			defer.reject('fail');
		}

		return defer.promise;
	}

	function broadcast(data) {
		switch (data.type) {
			case 'message':
				$rootScope.$broadcast('chatroom:msgNew', data);
				break;
			case 'read':
				break;
			case 'notification':
				$rootScope.$broadcast('notify:notifyNew', data);
				break;
			default:
				break;
		}
		
	}

	const service = {
		dataStream,
		socket,
		send,
	};

	return service;
}

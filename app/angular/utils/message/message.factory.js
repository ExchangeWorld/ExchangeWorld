'use strict';

const messageModule = require('./message.module');
const _             = require('lodash');

messageModule.factory('message', message);

/** @ngInject */
function message(Restangular, $q, exception, $localStorage) {
	const service = {
		getMessage,
		postMessage,
		updateMessage,
	};

	return service;

	function getMessage(uid) {
		const defer = $q.defer();

		Restangular
			.all('message')
			.getList({ receiver_uid: uid })
			.then(function(data) {
				if (_.isArray(data)) {
					defer.resolve(data);
				}
			})
			.catch(function(error) {
				return exception.catcher('[message Service] getMessage error: ')(error);
			});
		return defer.promise;
	}

	function postMessage(newNotice) {
		const defer = $q.defer();

		Restangular
			.all('message')
			.post(newNotice)
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[message Service] postMessage error: ')(error);
			});
		return defer.promise;
	}

	function updateMessage(message, unread) {
		const defer = $q.defer();

		message.route = 'message';
		message.unread = unread;

		message
			.put()
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[Messages Service] updateMessage error: ')(error);
			});
		return defer.promise;
	}
}

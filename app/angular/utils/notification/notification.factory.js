'use strict';

const notificationModule = require('./notification.module');
const _                  = require('lodash');

notificationModule.factory('notification', notification);

/** @ngInject */
function notification(Restangular, $q, exception) {
	const service = {
		getNotification,
		postNotification,
		updateNotification,
	};

	return service;

	function getNotification(uid) {
		const defer = $q.defer();

		Restangular
			.all('notification/belongsTo')
			.getList({ receiver_uid: uid })
			.then(function(data) {
				if (_.isArray(data)) {
					defer.resolve(data);
				}
			}, (error)=> {
				return exception.catcher('[notification Service] getNotification error: ')(error);
			});
		return defer.promise;
	}

	function postNotification(newNotice) {
		const defer = $q.defer();

		if(newNotice.sender_uid !== newNotice.receiver_uid) {
			Restangular
				.all('notification')
				.post(newNotice)
				.then(function(data) {
					defer.resolve(data);
				})
				.catch(function(error) {
					return exception.catcher('[Notification Service] postNotification error: ')(error);
				});
		}
		return defer.promise;
	}

	function updateNotification(notification, unread) {
		const defer = $q.defer();

		notification.route = 'notification';
		notification.unread = unread;

		notification
			.put()
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[Notifications Service] updateNotification error: ')(error);
			});
		return defer.promise;
	}
}

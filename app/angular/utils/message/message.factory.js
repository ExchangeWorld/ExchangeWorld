'use strict';

const messageModule = require('./message.module');
const _             = require('lodash');

messageModule.factory('message', message);

/** @ngInject */
function message(Restangular, $q, exception, $localStorage, $mdDialog, logger) {
	const service = {
		getMessage,
		postMessage,
		updateMessage,
		showMessagebox,
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

	function postMessage(newMessage) {
		const defer = $q.defer();

		Restangular
			.all('message')
			.post(newMessage)
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

	function showMessagebox(ev, msg) {
		$mdDialog.show({
			clickOutsideToClose: true,
			templateUrl: 'utils/message/message.html',
			controller: function DialogController($mdDialog) {
				const vm   = this;
				vm.msg     = msg;
				vm.content = '';

				vm.submit = function(msg_content) {
					$mdDialog
						.hide(msg_content)
						.then(function(msg_content) {
							postMessage({
								receiver_uid : msg.sender_uid,
								sender_uid   : msg.receiver_uid,
								content      : msg_content,
							})
							.then(function(data) {
								logger.success('訊息已寄出', data, 'done.');
							});
						});
				}
				vm.cancel = function() {
					$mdDialog.cancel();
				};
			},
			controllerAs:'vm'
		});
	}
}

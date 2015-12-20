'use strict';

const messageModule = require('./message.module');
const _             = require('lodash');
const moment        = require('moment');

messageModule.factory('message', message);

/** @ngInject */
function message(Restangular, $q, exception, $localStorage, $mdDialog) {
	const service = {
		getMessage,
		getConversation,
		postMessage,
		updateMessage,
		showMessagebox,
	};

	return service;

	function getMessage(uid) {
		const defer = $q.defer();

		Restangular
			.all('message')
			.getList({ 
				receiver_uid: uid,
				number: 5,
			})
			.then(function(data) {
				if (_.isArray(data)) {
					defer.resolve(data);
				}
			}, (error)=> {
				return exception.catcher('[message Service] getMessage error: ')(error);
			});
		return defer.promise;
	}

	/**
	 * Get two users conversations history. 
	 */
	function getConversation(uid1, uid2, number, offset) {
		const defer = $q.defer();
		Restangular
			.all('message/between')
			.getList({ 
				user1_uid : uid1,
				user2_uid : uid2,
				from      : offset,
				number    : number,
			})
			.then(function(data) {
				if (_.isArray(data)) {
					data.forEach(function(m) {
						m.time = moment(m.timestamp.slice(0, -1)).fromNow();
					});
					defer.resolve(data);
				}
			}, (error)=> {
				return exception.catcher('[message Service] getConversation error: ')(error);
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

	function updateMessage(message) {
		const defer = $q.defer();

		message.route = 'message/read';

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

	function showMessagebox(ev, msg, callback) {
		$mdDialog.show({
			clickOutsideToClose : false,
			templateUrl : 'utils/message/message.html',
			controllerAs : 'vm',
			controller : DialogController,
			locals: {
				msg: msg,
				callback: callback,
			}
		});
	}
}

/** @ngInject */
function DialogController(msg, callback, $mdDialog, logger, message, $state, $q, $timeout, $rootScope) {
	const vm       = this;
	vm.msg         = msg;
	vm.history     = [];
	vm.loadMore    = loadMore;
	vm.contents    = '';
	vm.onClickUser = onClickUser;
	vm.cancel      = onCancel;
	vm.submit      = onSubmit;
	vm.keyup       = keyup;
	vm.keydown     = keydown;
	vm.newMsgs     = [];

	activate();
	var shiftPressed = false;

	var amount, offset;
	function activate() {
		amount = 10;
		offset = 0;
		loadMore();

		// Sooooooooooo hack
		// trigger the scrollBottom directive to work.
		$timeout(function(){
			vm.newMsgs.push('hack');
		}, 100);
	}

	function loadMore() {
		var deferred = $q.defer();

		message
			.getConversation(msg.sender_uid, msg.receiver_uid, amount, offset)
			.then(function(data) {
				vm.history = [...data.reverse(), ...vm.history];
				offset += amount;

				deferred.resolve();
			});

		return deferred.promise;
	}

	function onClickUser(uid) {
		onCancel();
		$rootScope.onClickUser(uid);
	}

	function onSubmit(msg_content) {
		if(msg_content.trim().length === 0) return;
		message.
			postMessage({
				receiver_uid : msg.sender_uid,
				sender_uid   : msg.receiver_uid,
				content      : msg_content,
			})
			.then(function(data) {
				if(callback) callback();
				vm.history.push(data);
				vm.newMsgs.push(data);
				vm.contents = '';
			});
	}

	function onCancel() {
		$mdDialog.cancel();
	}

	function keyup(ev) {
		if(ev.keyCode === 16) { shiftPressed = false; }
	}

	function keydown(ev) {
		if(ev.keyCode === 16) { shiftPressed = true; }
		if(ev.keyCode === 13 && !shiftPressed) {
			onSubmit(vm.contents);
		}
	}
}

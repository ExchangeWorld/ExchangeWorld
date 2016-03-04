'use strict';

const messageModule = require('./message.module');
const _ = require('lodash');
const moment = require('moment');

messageModule.factory('message', message);

/** @ngInject */
function message(Restangular, $q, exception, $mdDialog, $localStorage, $rootScope) {
	var socket = new WebSocket(`ws://exwd.csie.org:43002/message?token=${$localStorage.token}`);
	var dataStream = [];

	socket.onopen = function(evt) {
		console.log('connected', evt);
	};
	socket.onclose = function(evt) {
		console.log('closed', evt);
	};
	socket.onmessage = function(evt) {
		console.log('receive', evt);
		dataStream.push(JSON.parse(evt.data));
	};
	socket.onerror = function(evt) {
		console.log('error', evt);
	};

	async function getMessageList() {
		const defer = $q.defer();
		const user = $localStorage.user;

		if (!user) {
			defer.reject({
				error: true
			});
			return defer.promise;
		}

		try {
			let list = await Restangular.one('user', user.uid).getList('chatroom');
			defer.resolve(list);
		} catch (err) {
			defer.reject(err);
		}

		return defer.promise;
	}

	async function getConversation(cid, number, offset) {
		const defer = $q.defer();

		try {
			//let ws = new WebSocket(`ws://exwd.csie.org:43002/message?token=${$localStorage.token}`);
			let history = await Restangular.one('chatroom', cid).all('message').getList({
				offset: offset,
				limit: number
			});
			defer.resolve(history.reverse());
		} catch (err) {
			defer.reject(err);
		}

		return defer.promise;
	}

	async function postMessage(newMessage) {
		const defer = $q.defer();

		try {
			let chat = JSON.stringify(newMessage);
			await socket.send(chat);
			defer.resolve(newMessage);
		} catch (err) {
			defer.reject(err);
		}

		return defer.promise;
	}

	function showMessagebox(ev, msg, callback) {
		$mdDialog.show({
			clickOutsideToClose: true,
			templateUrl: 'utils/message/message.html',
			controllerAs: 'vm',
			controller: DialogController,
			locals: {
				msg: msg,
				callback: callback,
			}
		});
	}

	const service = {
		dataStream,
		getMessageList,
		getConversation,
		postMessage,
		showMessagebox,
	};

	return service;
}

/** @ngInject */
function DialogController(msg, callback, $mdDialog, logger, message, $state, $q, $timeout, $rootScope) {
	const vm = this;
	vm.msg = msg;
	vm.history = [];
	vm.loadMore = loadMore;
	vm.contents = '';
	vm.onClickUser = onClickUser;
	vm.cancel = onCancel;
	vm.submit = onSubmit;
	vm.keyup = keyup;
	vm.keydown = keydown;
	vm.newMsgs = [];

	activate();
	var shiftPressed = false;

	var amount, offset;

	function activate() {
		amount = 10;
		offset = 0;
		loadMore();

		// Sooooooooooo hack
		// trigger the scrollBottom directive to work.
		$timeout(function() {
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
		if (msg_content.trim().length === 0) return;
		message.
		postMessage({
				receiver_uid: msg.sender_uid,
				sender_uid: msg.receiver_uid,
				content: msg_content,
			})
			.then(function(data) {
				if (callback) callback();
				vm.history.push(data);
				vm.newMsgs.push(data);
				vm.contents = '';
			});
	}

	function onCancel() {
		$mdDialog.cancel();
	}

	function keyup(ev) {
		if (ev.keyCode === 16) {
			shiftPressed = false;
		}
	}

	function keydown(ev) {
		if (ev.keyCode === 16) {
			shiftPressed = true;
		}
		if (ev.keyCode === 13 && !shiftPressed) {
			onSubmit(vm.contents);
		}
	}
}

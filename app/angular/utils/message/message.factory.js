'use strict';

const messageModule = require('./message.module');
const _ = require('lodash');
const moment = require('moment');

messageModule.factory('message', message);

/** @ngInject */
function message(Restangular, $timeout, $q, exception, $mdDialog, $localStorage, $rootScope, $mdMedia, logger) {
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
			let data = JSON.parse(evt.data);
			if (data.error) return;

			if (data.mid) {
				$rootScope.$broadcast('chatroom:new', data);
				logger.success('你有新訊息', null, 'NEWS');
			}
			$rootScope.$broadcast('chatroom:updatelist', data);
		});
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
			list.forEach(function(msg) {
				msg.read = msg.read_members.indexOf(user.uid) !== -1;
				msg.updated_at = moment(msg.updated_at.slice(0, -1)).add(8, 'h').fromNow();//.calendar();
			});
			defer.resolve(list);
		} catch (err) {
			defer.reject(err);
		}

		return defer.promise;
	}

	async function getChatroomInfo(cid) {
		const defer = $q.defer();

		if (!cid) {
			defer.reject({
				error: true
			});
			return defer.promise;
		}

		try {
			let info = await Restangular.one('chatroom', cid).get();
			defer.resolve(info);
		} catch (err) {
			defer.reject(err);
		}

		return defer.promise;
	}

	async function getConversation(cid, number, offset) {
		const defer = $q.defer();

		try {
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
			$rootScope.$broadcast('chatroom:updatelist', newMessage);
			defer.resolve(newMessage);
		} catch (err) {
			defer.reject(err);
		}

		return defer.promise;
	}

	async function createOrFindChatroom(withUid) {
		const defer = $q.defer();

		try {
			let chatroom = await Restangular.one('chatroom').one('with', withUid).get();
			defer.resolve(chatroom);
		} catch (err) {
			defer.reject(err);
		}

		return defer.promise;
	}

	async function readMessage(cid) {
		const defer = $q.defer();

		let form = {
			type: 'read',
			read_chatroom: cid
		};

		try {
			await socket.send(JSON.stringify(form));
			$rootScope.$broadcast('chatroom:updatelist', form);
			defer.resolve(form);
		} catch (err) {
			defer.reject(err);
		}
	
		return defer.promise;
	}

	async function showMessagebox(ev, uid, chat) {
		let chatroom = Boolean(chat) ? chat : await createOrFindChatroom(uid);
		
		let mdScope = $rootScope.$new();
		mdScope.instance = $mdDialog.show({
			clickOutsideToClose: true,
			fullscreen: ($mdMedia('sm') || $mdMedia('xs')),
			templateUrl: 'utils/message/message.html',
			controllerAs: 'vm',
			controller: 'm_messageController',
			scope: mdScope,
			resolve: {
				info: function() {
					return chatroom;
				}
			}
		});
	}

	const service = {
		dataStream,
		getMessageList,
		getChatroomInfo,
		getConversation,
		createOrFindChatroom,
		postMessage,
		readMessage,
		showMessagebox,
	};

	return service;
}

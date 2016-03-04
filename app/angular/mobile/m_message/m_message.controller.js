'use strict';

const m_messageModule = require('./m_message.module');
const _               = require('lodash');
m_messageModule.controller('m_messageController', m_messageController);

/** @ngInject */
function m_messageController(
	message,
	$state,
	$rootScope,
	$q,
	$stateParams,
	$timeout
) {
	const vm        = this;
	const cid       = $stateParams.cid;

	vm.dataStream   = message.dataStream;
	vm.history      = [];
	
	vm.loadMore     = loadMore;
	vm.contents     = '';
	vm.onClickUser  = $rootScope.onClickUser;
	vm.submit       = onSubmit;
	vm.newMsgs      = [];

	activate();
	var shiftPressed = false;

	var amount, offset;

	function activate() {
		amount = 30;
		offset = 0;
		loadMore();

		// Sooooooooooo hack
		// trigger the scrollBottom directive to work.
		$timeout(function() {
			vm.newMsgs.push('hack');
		}, 1000);
	}

	function loadMore() {
		var deferred = $q.defer();

		message
			.getConversation(cid, amount, offset)
			.then(function(data) {
				offset += amount;
				vm.history = [...data, ...vm.history];

				deferred.resolve(data);
			});

		return deferred.promise;
	}

	function onSubmit() {
		if (vm.contents.trim().length === 0) return;
		message
			.postMessage({
				chatroom_cid: cid,
				sender_uid: $rootScope.user.uid,
				content: vm.contents,
				created_at: new Date()
			})
			.then(function(data) {
				console.log(data);
				vm.dataStream.push(data);
				vm.newMsgs.push('hahaha');
			});
	}
}

'use strict';

const m_messageModule = require('./m_message.module');
const _               = require('lodash');
m_messageModule.controller('m_messageController', m_messageController);

/** @ngInject */
function m_messageController(
	logger,
	message,
	$state,
	$rootScope,
	$q,
	$stateParams,
	$timeout
) {
	const vm       = this;
	vm.msg         = $stateParams.msg;
	vm.history     = [];
	vm.loadMore    = loadMore;
	vm.contents    = '';
	vm.onClickUser = $rootScope.onClickUser;
	vm.submit      = onSubmit;
	vm.newMsgs     = [];

	activate();
	var shiftPressed = false;

	var amount, offset;
	function activate() {
		if(!vm.msg) {
			$state.go('root.oneCol.home');
		}
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
			.getConversation(vm.msg.sender_uid, vm.msg.receiver_uid, amount, offset)
			.then(function(data) {
				vm.history = [...data.reverse(), ...vm.history];
				offset += amount;

				deferred.resolve();
			});

		return deferred.promise;
	}

	function onSubmit(msg_content) {
		if(msg_content.trim().length === 0) return;
		message.
			postMessage({
				receiver_uid : vm.msg.sender_uid,
				sender_uid   : vm.msg.receiver_uid,
				content      : msg_content,
			})
			.then(function(data) {
				logger.success('訊息已寄出', data, 'DONE');
				vm.history.push(data);
				vm.newMsgs.push(data);
				vm.contents = '';
			});
	}
}

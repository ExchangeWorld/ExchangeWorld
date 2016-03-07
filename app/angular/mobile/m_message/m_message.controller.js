'use strict';

const m_messageModule = require('./m_message.module');
const _               = require('lodash');
m_messageModule.controller('m_messageController', m_messageController);

/** @ngInject */
function m_messageController(
	message,
	info,
	$scope,
	$state,
	$rootScope,
	$q,
	$mdDialog,
	$timeout
) {
	const vm        = this;
	const cid       = info.cid;
	vm.info = info;

	vm.dataStream   = message.dataStream;
	vm.history      = [];
	
	vm.loadMore     = loadMore;
	vm.contents     = '';
	vm.onClickUser  = $rootScope.onClickUser;
	vm.submit       = onSubmit;
	vm.newMsgs      = [];

	vm.cancel  = onCancel;
	vm.submit  = onSubmit;
	vm.keyup   = keyup;
	vm.keydown = keydown;

	activate();
	var shiftPressed = false;

	var amount, offset;

	async function activate() {
		amount = 30;
		offset = 0;

		await loadMore();
		goButtom();
	}

	async function loadMore() {
		let deferred = $q.defer();

		try {
			let data = await message.getConversation(cid, amount, offset);
			offset += amount;
			vm.history = [...data, ...vm.history];

			deferred.resolve(data);
		} catch (err) {
			deferred.reject(err);
		}

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
				vm.dataStream.push(data);
				goButtom();
			});
	}

	function onCancel() {
		if ($scope.instance) $mdDialog.hide();
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
	
	function goButtom() {
		// Sooooooooooo hack
		// trigger the scrollBottom directive to work.
		$timeout(function() {
			vm.newMsgs.push('hack');
		}, 10);
	}
}

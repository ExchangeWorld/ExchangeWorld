'use strict';

const m_messageModule = require('./m_messagebox.module');
const _               = require('lodash');
const moment          = require('moment');

m_messageModule.controller('m_messageboxController', m_messageboxController);

/** @ngInject */
function m_messageboxController(message, $state, $rootScope, $localStorage, exception) {
	const vm = this;
	vm.messages = [];
	vm.onClickMessage = onClickMessage;

	activate();

	function activate() {
		$rootScope.isLoggedIn = Boolean($localStorage.user);
		if ($rootScope.isLoggedIn) $rootScope.user = $localStorage.user;
		if (!$rootScope.isLoggedIn) {
			$state.go('root.404');
			return;
		}
		updateMessagebox();

	}

	function onClickMessage(msg) {
		$state.go('root.oneCol.m_message', {
			cid: msg.cid
		});
	}

	async function updateMessagebox() {
		vm.loading = true;

		try {
			vm.messages = await message.getMessageList();
			//vm.messages.forEach(function(msg) {
			//msg.updated_at = moment(msg.timestamp.slice(0, -1)).add(8, 'h').fromNow();//.calendar();
			//});
			vm.loading = false;
		} catch (err) {
			exception.catcher('唉呀出錯了！')(err);
			vm.loading = false;
		}
	}

}

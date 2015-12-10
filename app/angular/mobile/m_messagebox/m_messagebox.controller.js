'use strict';

const m_messageModule = require('./m_messagebox.module');
const _               = require('lodash');
const moment          = require('moment');

m_messageModule.controller('m_messageboxController', m_messageboxController);

/** @ngInject */
function m_messageboxController(logger, message, $state, $localStorage) {
	const vm          = this;
	vm.user           = $localStorage.user;
	vm.messages       = [];
	vm.onClickMessage = onClickMessage;

	activate();

	function activate() {
		if(!vm.user) {
			$state.go('root.withSidenav.404');
		}

		message
			.getMessage(vm.user.uid)
			.then((msgs) => {
				console.log(msgs);
				vm.messages = _.unique(msgs, 'sender_uid');
				vm.messages.forEach(function(msg) {
					msg.timestamp = moment(msg.timestamp.slice(0, -1)).calendar();
				});
			});
	}

	function onClickMessage(msg, ev) {
		$state.go('root.oneCol.m_message', { msg: msg });
	}

}

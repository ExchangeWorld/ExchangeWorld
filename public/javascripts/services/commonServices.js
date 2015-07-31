"use strict";

angular
	.module('commonServices', [])
	.factory('sharedProperties', shareproperties);

function shareproperties() {
	var stringValue = 'seek';
	var service = {
		getString: getstring,
		setString: setstring
	};

	return service;

	///////////////


	function getstring() {
		return stringValue;
	}

	function setstring(value) {
		stringValue = value;
	}
}


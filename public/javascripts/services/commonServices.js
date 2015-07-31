"use strict";

angular
	.module('commonServices', [])
	.factory('sharedProperties', shareproperties);

function shareproperties() {
	var service = {
		getString: getstring,
		setString: setstring
	};

	var stringValue = 'seek';

	return service;

	///////////////

	function getstring() {
		return stringValue;
	}

	function setstring(value) {
		stringValue = value;
	}
}


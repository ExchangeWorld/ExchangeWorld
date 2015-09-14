"use strict";

const routerModule = require('./router.module');
const angular      = require('angular');
routerModule.provider('routerHelper', routerHelperProvider);

/** @ngInject */
function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {

	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	});

	var config = {
		resolveAlways : {}
	};

	this.configure = function(cfg) {
		angular.extend(config, cfg);
	};

	this.$get = RouterHelper;

	/** @ngInject */
	function RouterHelper($location, $rootScope, $state, logger) {
		var handlingStateChangeError = false;
		var hasOtherwise             = false;
		var stateCounts              = {
			errors : 0,
			changes : 0,
		};

		var service = {
			configureStates : configureStates,
			getStates : getStates,
			stateCounts : stateCounts,
		};

		init();

		return service;


		function configureStates(states, otherwisePath) {
			states.forEach(function(state) {
				state.config.resolve =
					angular.extend(state.config.resolve || {}, config.resolveAlways);
				$stateProvider.state(state.state, state.config);
			});
			if (otherwisePath && !hasOtherwise) {
				hasOtherwise = true;
				$urlRouterProvider.otherwise(otherwisePath);
			}
		}

		function getStates() {
			return $state.get();
		}

		function init() {
			handleRoutingErrors();
			stateChanged();
		}

		function handleRoutingErrors() {
			// Route cancellation:
			// On routing error, go to the dashboard.
			// Provide an exit clause if it tries to do it twice.
			$rootScope.$on('$stateChangeError',
				function(event, toState, toParams, fromState, fromParams, error) {
					if (handlingStateChangeError) {
						return;
					}

					stateCounts.errors++;
					handlingStateChangeError = true;

					var destination = (toState &&
						(toState.title || toState.name || toState.loadedTemplateUrl)) ||
						'unknown target';

					var msg = 'Error routing to ' + destination + '. ' + (error.data || '') +
						'. <br/>' + (error.statusText || '') + ': ' + (error.status || '');

					logger.warning(msg, [toState]);
					$location.path('/');
				}
			);
		}

		function stateChanged() {
			$rootScope.$on('$stateChangeSuccess', function(event, toState) {
					stateCounts.changes++;
					handlingStateChangeError = false;

				}
			);
		}
	}
}
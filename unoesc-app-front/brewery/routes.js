(function() {

	'use strict';

	// está usando o módulo que tem no route
	angular.module('brewery').config(Config);

	function Config($routeProvider) {
		$routeProvider.when('/breweries', {
			templateUrl: 'brewery/brewery.html',
			controller: 'BreweryController',
			controllerAs : 'vm'
		});
	}

})();
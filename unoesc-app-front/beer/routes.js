(function() {

	'use strict';

	// está usando o módulo que tem no route
	// com isso o ngRoute já está injetado
	angular.module('beer').config(Config);

	function Config($routeProvider) {
		$routeProvider.when('/beers', {
			templateUrl: 'beer/beer.html',
			controller: 'BeerController',
			controllerAs : 'vm' //virtual model
		});
	}

})();
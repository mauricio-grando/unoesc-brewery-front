(function() {

	'use strict';

	// está usando o módulo que tem no route
	// com isso o ngRoute já está injetado
	angular.module('auth').config(Config);

	function Config($routeProvider) {
		$routeProvider.when('/login', {
			templateUrl: 'auth/login.html',
			controller: 'AuthController',
			controllerAs : 'vm' //virtual model
		});
	}

})();
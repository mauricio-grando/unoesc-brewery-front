(function() {

	'use strict';

	// está usando o módulo que tem no route
	// com isso o ngRoute já está injetado
	angular.module('user').config(Config);

	function Config($routeProvider) {
		$routeProvider.when('/users', {
			templateUrl: 'user/user.html',
			controller: 'UserController',
			controllerAs : 'vm' //virtual model
		});
	}

})();
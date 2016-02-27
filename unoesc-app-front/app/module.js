(function() {
	'use strict';

	// faz a injeçaõ das dependencias, senão os módulos não vão ser carregados
	angular.module('app', ['ngRoute', 'brewery', 'beer', 'user']).config(Config);

	function Config($routeProvider) {
		$routeProvider.when('/',{
			templateUrl: 'app/app.html',
			controller: 'AppController',
			controllerAs: 'vm'
		});
	} 
})();
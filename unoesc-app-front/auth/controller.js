(function() {
	'use strict';

	// usando o módulo user e definindo um controller
	angular.module('auth').controller('AuthController', AuthController);

	// injeta o serviço do service.js
	// foi injetado o BreweryService para trazer as cerevejarias
	AuthController.$inject = ['AuthService'];

	function AuthController(AuthService, BeerService) {
		// facilita na migração
		var vm = this; // virtual model que liga a view (html) ao controller (crud)
		vm.empty = {};
		vm.reset = function() {
			vm.credentials = angular.copy(vm.empty);
		}

		vm.login = function() {
			AuthService.login(credentials).then(function(response) {
				console.log(response.data);
			}, function() {
				console.error(error);
			});
		}
	}

})();
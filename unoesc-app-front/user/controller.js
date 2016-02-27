(function() {
	'use strict';

	// usando o módulo user e definindo um controller
	angular.module('user').controller('UserController', UserController);

	// injeta o serviço do service.js
	// foi injetado o BreweryService para trazer as cerevejarias
	UserController.$inject = ['UserService', 'BeerService'];

	function UserController(UserService, BeerService) {
		// facilita na migração
		var vm = this; // virtual model que liga a view (html) ao controller (crud)
		vm.empty = {};
		vm.findAll = function() {
			// chama o método de consulta
			UserService.findAll().then(function(response) {
				// popula o array de objetos de retorno
				vm.users = response.data;
			}, function(error) {
				// se caiu aqui quer dizer que retornou diferente de code 200
				console.error(error);
			});
		}
		vm.findAll();

		vm.findAllBeers = function() {
			BeerService.findAll().then(function(response) {
				vm.beers = response.data;

			}, function() {
				console.error(error);
			});
		}
		vm.findAllBeers();

		// limpa o formulário usando uma cópia de objeto vazio
		vm.reset = function() {
			vm.user = angular.copy(vm.empty);
		}

		vm.save = function(user) {
			if (user._id) {
				UserService.update(user).then(function(response) {
					vm.success = response.data;

					// atualiza a busca e reseta o form
					vm.findAll();
					vm.reset();

				}, function(error) {
					console.log(error);
					vm.error = error.data;
				});
			} else {
				UserService.create(user).then(function(response) {
					vm.success = response.data;

					// atualiza a busca e reseta o form
					vm.findAll();
					vm.reset();

				}, function(error) {
					console.log(error);
					vm.error = error.data;
				});
			}
		}

		vm.populate = function(user) {
			vm.user = angular.copy(user);
		}

		vm.remove = function(user) {
			if(confirm('Tem certeza que gostaria de remover o usuário ' + user.name) + '?') {
				// chama o serviço de delete
				UserService.remove(user._id).then(function(response) {
				vm.success = response.data;

				// depois de remover é preciso recarregar a tabela de itens
				vm.findAll();

				}, function(error) {
					console.error(error);
					vm.error = error.data;
				});
			}
		}
	}

})();
(function() {
	'use strict';

	angular.module('brewery').controller('BreweryController', BreweryController);

	// injeta o serviço do service.js
	BreweryController.$inject = ['BreweryService'];

	function BreweryController(BreweryService) {
		// facilita na migração
		var vm = this;
		vm.empty = {};
		vm.findAll = function() {
			// chama o método de consulta
			BreweryService.findAll().then(function(response) {
				// popula o array de objetos de retorno
				vm.breweries = response.data;
			}, function(error) {
				console.error(error);
			});
		}
		vm.findAll();

		// limpa o formulário usando uma cópia de objeto vazio
		vm.reset = function() {
			vm.brewery = angular.copy(vm.empty);
		}

		vm.save = function(brewery) {
			if (brewery._id) {
				BreweryService.update(brewery).then(function(response) {
					vm.success = response.data;

					// atualiza a busca e reseta o form
					vm.findAll();
					vm.reset();

				}, function(error) {
					console.log(error);
					vm.error = error.data;
				});
			} else {
				BreweryService.create(brewery).then(function(response) {
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

		vm.populate = function(brewery) {
			vm.brewery = angular.copy(brewery);
		}

		vm.remove = function(brewery) {
			if(confirm('Tem certeza que gostaria de remover a cervejaria ' + brewery.name) + '?') {
				// chama o serviço de delete
				BreweryService.remove(brewery._id).then(function(response) {
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
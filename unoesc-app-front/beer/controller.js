(function() {
	'use strict';

	// usando o módulo beer e definindo um controller
	angular.module('beer').controller('BeerController', BeerController);

	// injeta o serviço do service.js
	// foi injetado o BreweryService para trazer as cerevejarias
	BeerController.$inject = ['BeerService', 'BreweryService'];

	function BeerController(BeerService, BreweryService) {
		// facilita na migração
		var vm = this; // virtual model que liga a view (html) ao controller (crud)
		vm.empty = {};
		vm.findAll = function() {
			// chama o método de consulta
			BeerService.findAll().then(function(response) {
				// popula o array de objetos de retorno
				vm.beers = response.data;
			}, function(error) {
				// se caiu aqui quer dizer que retornou diferente de code 200
				console.error(error);
			});
		}
		vm.findAll();

		vm.findAllBreweries = function() {
			BeerService.findAll().then(function() {
				vm.breweries = response.data;

			}, function() {
				console.error(error);
			});
		}
		vm.findAllBreweries();

		// limpa o formulário usando uma cópia de objeto vazio
		vm.reset = function() {
			vm.beer = angular.copy(vm.empty);
		}

		vm.save = function(beer) {
			if (beer._id) {
				BeerService.update(beer).then(function(response) {
					vm.success = response.data;

					// atualiza a busca e reseta o form
					vm.findAll();
					vm.reset();

				}, function(error) {
					console.log(error);
					vm.error = error.data;
				});
			} else {
				BeerService.create(beer).then(function(response) {
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

		vm.populate = function(beer) {
			vm.beer = angular.copy(beer);
		}

		vm.remove = function(beer) {
			if(confirm('Tem certeza que gostaria de remover a cervejaria ' + beer.name) + '?') {
				// chama o serviço de delete
				BeerService.remove(beer._id).then(function(response) {
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
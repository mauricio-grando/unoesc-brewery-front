(function() {
	'use strict';

	// usando o modulo já com o ngRoute injetado
	angular.module('beer').service('BeerService', BeerService);

	BeerService.$inject = ['API', '$http'];

	// cria os métodos que vão chamar a app para CRUD
	function BeerService(API, $http) {
		this.findAll = function () {
			return $http.get(API.url + 'beers');
		}
		this.create = function(beer) {
			return $http.post(API.url + 'beers', beer);
		}
		this.update = function(beer) {
			return $http.put(API.url + 'beers/' + beer._id, beer);
		}
		this.remove = function(id) {
			return $http.delete(API.url + 'beers/' + id);
		}
	};

})();
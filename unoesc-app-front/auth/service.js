(function() {
	'use strict';

	// usando o modulo já com o ngRoute injetado
	angular.module('auth').service('AuthService', AuthService);

	AuthService.$inject = ['API', '$http'];

	// cria os métodos que vão chamar a app para CRUD
	function AuthService(API, $http) {
		this.login = function (credentials) {
			return $http.post(API.url + 'login', credentials);
		}
	};

})();
(function() {
	'use strict';

	// usando o modulo já com o ngRoute injetado
	angular.module('user').service('UserService', UserService);

	UserService.$inject = ['API', '$http'];

	// cria os métodos que vão chamar a app para CRUD
	function UserService(API, $http) {
		this.findAll = function () {
			return $http.get(API.url + 'users');
		}
		this.create = function(user) {
			return $http.post(API.url + 'users', user);
		}
		this.update = function(user) {
			return $http.put(API.url + 'users/' + user._id, user);
		}
		this.remove = function(id) {
			return $http.delete(API.url + 'users/' + id);
		}
	};

})();
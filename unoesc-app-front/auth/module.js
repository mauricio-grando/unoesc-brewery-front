(function() {
	'use strict';

	// cria e define um módulo com o ngRoute para auth
	// quando não é passado um array (ex ngRoute) então está usando e não criando
	angular.module('auth', ['ngRoute']);

})();

// o uso do function faz com que todos os arquivos tenham seu próprio escopo (encapsulado)
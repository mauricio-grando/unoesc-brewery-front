(function() {
	'use strict';

	// cria e define um módulo com o ngRoute para beer
	// quando não é passado um array (ex ngRoute) então está usando e não criando
	angular.module('beer', ['ngRoute']);

})();

// o uso do function faz com que todos os arquivos tenham seu próprio escopo (encapsulado)
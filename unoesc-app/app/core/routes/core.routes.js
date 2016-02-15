'use strict';

module.exports = function(api) {
	// requer o controller, daonde virão as mensagens da página
	var core = require('../controllers/core.controller');
	
	// faz a api ouvir a url na '/'
	// se for trocado para outra coisa, ficaria: <host>:<port>/api/outra coisa
	api.route('/').get(core.index);
};
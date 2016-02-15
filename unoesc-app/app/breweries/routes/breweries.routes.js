'use strict';

module.exports = function(api) {
	var breweries = require('../controllers/breweries.controller');
	
	// chama o controller e o método findAll (é usado o all pq não estamos passando id para buscar apenas 1 registro)
	api.route('/breweries')
	   .get(breweries.findAll)
	   .post(breweries.create);
	
	api.route('/breweries/:breweryId')
	   .get(breweries.find)
	   .put(breweries.update)
	   .delete(breweries.delete);
	   
	api.param('breweryId', breweries.breweryById);
}
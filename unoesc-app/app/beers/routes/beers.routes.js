'use strict';

module.exports = function(api) {
	var beers = require('../controllers/beers.controller');
	
	// chama o controller e o método findAll (é usado o all pq não estamos passando id para buscar apenas 1 registro)
	api.route('/beers')
	   .get(beers.findAll)
	   .post(beers.create);
	
	api.route('/beers/:beerId')
	   .get(beers.find)
	   .put(beers.update)
	   .delete(beers.delete);
	   
	api.param('beerId', beers.beerById);
}
'use strict';

module.exports = function(api) {
	var users = require('../controllers/users.controller');
	
	// chama o controller e o método findAll (é usado o all pq não estamos passando id para buscar apenas 1 registro)
	api.route('/users')
	   .get(users.findAll)
	   .post(users.create);
	
	api.route('/users/:userId')
	   .get(users.find)
	   .put(users.update)
	   .delete(users.delete);
	   
	api.param('userId', users.userById);
}
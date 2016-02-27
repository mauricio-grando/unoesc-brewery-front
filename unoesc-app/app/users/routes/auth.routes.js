'use strict';

module.exports = function(api) {
	var users = require('../controllers/auth.controller');
	
	api.route('/login')
	   .get(user.auth);
}
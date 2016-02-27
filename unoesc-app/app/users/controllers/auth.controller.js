'use strict';

var jwt = require('jsonwebtoken'),
	User = require('../models/user.model'),
	secret = 'secret-unoesc-app';

exports.login = function(req, res) {
	if(!req.body.email) {
		res.status(400).json({ message: 'Entre com um email' });
	}

	if(!req.body.password) {
		res.status(400).json({ message: 'Entre com uma senha' });
	}

	// busca um usuário com o email recebido
	User.findOne({ email: req.body.email }, function(err, user) {
		if(err) {
			res.status(404).json({ message: 'Usuário não encontrado' });
		}

		// se não tem erro, verifica se a senha recebida é igual à do usuário
		// bcrypt usa err, valid
		user.comparePassword(req.body.password, function(valid) {
			if(!valid) {
				res.status(401).json({ message: 'Falha na autenticação, tente novamente'});
			} else {
				// gera um hash a partir do usuário e do secret
				var token = jwt.sign(user, secret);
				res.status(200).json({
					user: user,
					token: token
				});
			}
		});

	});
};
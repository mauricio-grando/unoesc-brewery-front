'use strict';

var mongoose = require('mongoose'), 
	User = require('../models/user.model')

exports.findAll = function(req, res) {
	User.find({}).populate('beer').exec(function(err, users) {
		if (err) {
			console.error(err);
			res.status(400).json(err);
		} else {
			res.json(users);
		}
	});
};

exports.find = function(req, res) {
	res.json(req.user);
};

exports.create = function(req, res) {
	var user = new User(req.body);
	saveAll(user, res, 'criado');	
};

exports.update = function(req, res) {
	var user = req.user;
	user.name = req.body.name;
	user.description = req.body.description;
	user.beer = req.body.beer;
	saveAll(user, res, 'atualizado');
};

exports.delete = function(req, res) {
	var user = req.user;
	user.remove(function(err){
	if (err) {
			res.status(400).json({
				message: err
			});
		} else {
			res.json({
				message: 'Usuário removida com sucesso.',
				user: user
			})
		}
	});
};

exports.userById = function(req, res, next, userId) {
	// verifica se o id da cervejaria existe
	if(!mongoose.Types.ObjectId.isValid(userId)) {
		res.status(400).json({
			message: 'Usuário inválida'
		})
	}
	User.findById(userId).populate('beer').exec(function(err, user) {
		if (err) {
			res.status(404).json(err);
		}
		req.user = user;
		next();
	});
};

// função para salvar os dados
// o parametro 'op' é a string da operação para usar na mensagem
function saveAll(user, res, op) {
	user.save(function(err) {
		if (err) {
			res.status(400).json({
				message: err
			});
		} else {
			res.json({
				message: 'Usuário ' + op + ' com sucesso.',
				user: user
			})
		}
	});
};
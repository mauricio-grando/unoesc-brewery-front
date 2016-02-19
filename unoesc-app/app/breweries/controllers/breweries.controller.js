'use strict';

var mongoose = require('mongoose'), 
	Brewery = require('../models/brewery.model'),
	Moment = require('moment-timezone');

exports.findAll = function(req, res) {
	Brewery.find({}).exec(function(err, breweries) {
		if (err) {
			console.error(err);
			res.status(400).json(err);
		} else {
			res.json(breweries);
		}
	});
};

exports.find = function(req, res) {
	res.json(req.brewery);
};

exports.create = function(req, res) {
	var brewery = new Brewery(req.body);
	brewery.creationDate = new Date();
	saveAll(brewery, res, 'criada');	
};

exports.update = function(req, res) {
	var brewery = req.brewery;
	brewery.name = req.body.name;
	brewery.description = req.body.description;
	saveAll(brewery, res, 'atualizada');
};

exports.delete = function(req, res) {
	var brewery = req.brewery;
	brewery.remove(function(err){
	if (err) {
			res.status(400).json({
				message: err
			});
		} else {
			res.json({
				message: 'Cervejaria removida com sucesso.',
				brewery: brewery
			})
		}
	});
};

exports.breweryById = function(req, res, next, breweryId) {
	// verifica se o id da cervejaria existe
	if(!mongoose.Types.ObjectId.isValid(breweryId)) {
		res.status(400).json({
			message: 'Cervejaria inválida'
		})
	}
	Brewery.findById(breweryId).exec(function(err, brewery) {
		if (err) {
			res.status(404).json(err);
		}
		req.brewery = brewery;
		next();
	});
};

// função para salvar os dados
// o parametro 'op' é a string da operação para usar na mensagem
function saveAll(brewery, res, op) {
	brewery.lastModifiedDate = Moment().tz("America/Sao_Paulo").format();
	brewery.save(function(err) {
		if (err) {
			res.status(400).json({
				message: err
			});
		} else {
			res.json({
				message: 'Cervejaria ' + op + ' com sucesso.',
				brewery: brewery
			})
		}
	});
};
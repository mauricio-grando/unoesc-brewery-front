'use strict';

var mongoose = require('mongoose'), 
	Beer = require('../models/beer.model'),
	Moment = require('moment-timezone');

exports.findAll = function(req, res) {
	Beer.find({}).populate('brewery').exec(function(err, beers) {
		if (err) {
			console.error(err);
			res.status(400).json(err);
		} else {
			res.json(beers);
		}
	});
};

exports.find = function(req, res) {
	res.json(req.beer);
};

exports.create = function(req, res) {
	var beer = new Beer(req.body);
	beer.creationDate = new Date();
	saveAll(beer, res, 'criada');	
};

exports.update = function(req, res) {
	var beer = req.beer;
	beer.name = req.body.name;
	beer.description = req.body.description;
	beer.brewery = req.body.brewery;
	saveAll(beer, res, 'atualizada');
};

exports.delete = function(req, res) {
	var beer = req.beer;
	beer.remove(function(err){
	if (err) {
			res.status(400).json({
				message: err
			});
		} else {
			res.json({
				message: 'Cerveja removida com sucesso.',
				beer: beer
			})
		}
	});
};

exports.beerById = function(req, res, next, beerId) {
	// verifica se o id da cervejaria existe
	if(!mongoose.Types.ObjectId.isValid(beerId)) {
		res.status(400).json({
			message: 'Cerveja inválida'
		})
	}
	Beer.findById(beerId).populate('brewery').exec(function(err, beer) {
		if (err) {
			res.status(404).json(err);
		}
		req.beer = beer;
		next();
	});
};

// função para salvar os dados
// o parametro 'op' é a string da operação para usar na mensagem
function saveAll(beer, res, op) {
	beer.lastModifiedDate = Moment().tz("America/Sao_Paulo").format();
	beer.save(function(err) {
		if (err) {
			res.status(400).json({
				message: err
			});
		} else {
			res.json({
				message: 'Cerveja ' + op + ' com sucesso.',
				beer: beer
			})
		}
	});
};
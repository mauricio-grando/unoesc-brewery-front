'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BrewerySchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	description: {
		type: String
	},
	creationDate: {
		type: Date
    },
    lastModifiedDate: {
     	type: Date
	}
});

// exportando o modelo criado como Brewery e usando o schema criado
module.exports = mongoose.model('Brewery', BrewerySchema);
'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BeerSchema = new Schema({
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
	},
	brewery: {
		// objeto referenciado pelo obj Brewery
		type: Schema.ObjectId,
		ref: 'Brewery'
	}
});

// para data padrao
// default: Date.now()

// exportando o modelo criado como Beer e usando o schema criado
module.exports = mongoose.model('Beer', BeerSchema);
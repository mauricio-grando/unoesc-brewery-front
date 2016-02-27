'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
    },
    beer: {
		type: Schema.ObjectId,
		ref: 'Beer'
	}
});

// exportando o modelo criado como User e usando o schema criado
module.exports = mongoose.model('User', UserSchema);
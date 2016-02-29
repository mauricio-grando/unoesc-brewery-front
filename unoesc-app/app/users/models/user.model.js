'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcryptjs');

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
	},
	roles: {
		type: Array,
		default: ['user']
	}
});

// verificado se alterou a senha ou se é um usuário novo
// é executado um passo antes da função save
UserSchema.pre('save', function(next) {
	var user = this;
	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10, function(err, salt) {
			if (err) {
				console.error(err);
				return next(err);
			}
			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) {
					console.error(err);
					return next(err);
				}
				user.password = hash;
				next();
			});
		});
	} else {
		return next();
	}
});
UserSchema.methods.comparePassword = function(password, callback) {
	// o this é o usuário encontrado
	// o isValid é um boolean indicando se a senha está correta ou não
	bcrypt.compare(password, this.password, function(err, isValid) {
		if (err) {
			return callback(err);
		}
		callback(null, isValid);
	});
};

// exportando o modelo criado como User e usando o schema criado
module.exports = mongoose.model('User', UserSchema);
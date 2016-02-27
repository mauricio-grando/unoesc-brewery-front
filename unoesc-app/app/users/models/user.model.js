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
	if(this.isModified('password') || this.isNew) {
		user.password = user.password;
		// TODO usar lib bcryptjs para criptografar a senha
	}
	next();
});

UserSchema.methods.comparePassword = function(password, callback) {
	// TODO implementar o bcrypt.compare

	// o this é o usuário encontrado
	// o primeiro parametro é o err, então se deu certo retorna null
	if(password == this.password) {
		// bcrypt callback(null, true);
		callback(true);
	} else {
		callback(false);
	}

}

// exportando o modelo criado como User e usando o schema criado
module.exports = mongoose.model('User', UserSchema);
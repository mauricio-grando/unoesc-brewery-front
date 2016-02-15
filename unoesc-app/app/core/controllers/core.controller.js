'use strict';

// exporta uma variavel para ser usada como index
exports.index = function(req, res) {
	res.json({message: 'Hello my friend'});
};
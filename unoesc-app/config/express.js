'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    cors = require('cors');

module.exports = function(db) {
	// cria a app com a configuração da variavel express
    var app = express();
    app.use(bodyParser.urlencoded({
		extended: true
	}));
	
	app.use(bodyParser.json());
	app.use(cors());
	
	// pega o roteador express
	var api = express.Router();
	
	// chama as rotas
	require('../app/core/routes/core.routes')(api);
	require('../app/users/routes/auth.routes')(api);
	require('../app/breweries/routes/breweries.routes')(api);
	require('../app/beers/routes/beers.routes')(api);
	require('../app/users/routes/users.routes')(api);
	
	// usa a api chamada acima na url /api, mas pode ser trocado para outra coisa
	app.use('/api', api);
	
    return app;
}
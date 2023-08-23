const express = require('express');

const routes = express.Router();

const produtorController = require('./controllers/produtorControllers');
// const filaController = require('./controllers/filaControllers');

routes.post('/criarProdutor', produtorController.create);
routes.get('/listarProdutores', produtorController.read);
routes.put('/atualizarProdutores', produtorController.update);
routes.delete('/deletarProdutores/:id', produtorController.delete);

//routes.get('/showLine', filaController.show);
//routes.get('/filterLine/:genero', filaController.filter);

module.exports = routes;

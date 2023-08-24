const express = require('express');

const routes = express.Router();

const produtorController = require('./controllers/produtorControllers');

routes.post('/criarProdutor', produtorController.create);
routes.get('/listarProdutores', produtorController.read);
routes.put('/atualizarProdutores', produtorController.update);
routes.delete('/deletarProdutores/:id', produtorController.delete);

module.exports = routes;

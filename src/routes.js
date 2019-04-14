const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

routes.post('/boxes', BoxController.store);
routes.get('/boxes/:id', BoxController.show);
routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store);


//req: representa a requisição feita para o servidor.
//res: representa a resposta que vai retornar para o cliente.
module.exports = routes;
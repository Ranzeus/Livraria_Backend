//Imports
const express = require('express');
const routes = express.Router();
const TestController = require('./src/modules/test/TestController');
const LoginController = require('./src/modules/login/LoginController')
const BooksController = require('./src/modules/books/BooksController')

routes.get('/selfCheck', TestController.test.bind(TestController));
routes.get('/login', LoginController.login.bind(LoginController));

routes.post('/listBooks', BooksController.listBooks.bind(BooksController));
routes.get('/detailBook', BooksController.detailBook.bind(BooksController));
routes.get('/hentBook', BooksController.hentBook.bind(BooksController));
routes.post('/registerBook', BooksController.registerBook.bind(BooksController));
routes.put('/updateBook', BooksController.updateBook.bind(BooksController));
routes.delete('/removeBook', BooksController.removeBook.bind(BooksController));

module.exports = routes;
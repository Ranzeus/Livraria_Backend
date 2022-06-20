//Imports
const express = require('express');
const routes = express.Router();
const TestController = require('./src/modules/test/TestController');
const LoginController = require('./src/modules/login/LoginController')
const BooksController = require('./src/modules/books/BooksController')
const authMiddleware = require('./src/middlewares/auth');

//valida conta utilizando Middleware e token gerado
routes.use('/books/listBooks', authMiddleware);
routes.use('/books/detailBook', authMiddleware);
routes.use('/books/hentBook', authMiddleware);
routes.use('/books/registerBook', authMiddleware);
routes.use('/books/updateBook', authMiddleware);
routes.use('/books/removeBook', authMiddleware);

routes.get('/selfCheck', TestController.test.bind(TestController));

routes.get('/login', LoginController.login.bind(LoginController));

routes.post('/books/listBooks', BooksController.listBooks.bind(BooksController));
routes.get('/books/detailBook', BooksController.detailBook.bind(BooksController));
routes.get('/books/hentBook', BooksController.hentBook.bind(BooksController));
routes.post('/books/registerBook', BooksController.registerBook.bind(BooksController));
routes.put('/books/updateBook', BooksController.updateBook.bind(BooksController));
routes.delete('/books/removeBook', BooksController.removeBook.bind(BooksController));

module.exports = routes;
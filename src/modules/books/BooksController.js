const BookBusiness = require('./BooksBusiness')

class BooksController {
    constructor() {
        this.bookBusiness = new BookBusiness();

    };

    async listBooks(req, res){
        try {
            const listResult = await this.bookBusiness.listBooks(req.body);
            res.send(listResult);
        }catch (err) {
            res.status(400).send({error: err})
        }
    }

    async detailBook(req, res){
        try {
            const detailResult = await this.bookBusiness.detailBook(req.body.id);
            res.send(detailResult);
        }catch (err) {
            res.status(400).send({error: err})
        }
    }

    async hentBook(req, res){
        try {
            const hentResult = await this.bookBusiness.hentBook(req.body.id);
            res.send(hentResult);
        }catch (err) {
            res.status(400).send({error: err})
        }
    }

    async registerBook(req, res){
        try {
            const registerResult = await this.bookBusiness.registerBook(req.body);
            res.send(registerResult);
        }catch (err) {
            res.status(400).send({error: err})
        }
    }

    async updateBook(req, res){
        try {
            const updateResult = await this.bookBusiness.updateBook(req.body);
            res.send(updateResult);
        }catch (err) {
            res.status(400).send({error: err})
        }
    }

    async removeBook(req, res){
        try {
            const updateResult = await this.bookBusiness.removeBook(req.body.id);
            res.send(updateResult);
        }catch (err) {
            res.status(400).send({error: err})
        }
    }
}
module.exports = new BooksController();
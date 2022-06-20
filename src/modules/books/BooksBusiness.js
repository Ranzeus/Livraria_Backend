const BooksRepository= require('./booksRepository')

class BooksBusiness {
    constructor() {
        this.msg ="Chama BookRepository";
        this.msgError ="Erro ao Chamar BookRepository";
        this.booksRepository = new BooksRepository();
    };

    async listBooks(id, title, status, author){
        try {
            console.log("chama BookRepository") //######### FALTA IMPLEMENTAR A PESQUISA
            const listResult =  this.booksRepository.listBooks(id, title, status, author);
            return listResult;
        }catch (err) {
            console.log("cascateia o erro")
            throw this.msgError;
        }
    }

    async detailBook(id){
        try {
            console.log("chama BookRepository")
            const detailResult =  this.booksRepository.detailBook(id);
            return detailResult;
        }catch (err) {
            console.log("cascateia o erro")
            throw this.msgError;
        }
    }

    async hentBook(id){
        try {
            console.log("chama BookRepository")
            return this.msg;
        }catch (err) {
            console.log("cascateia o erro")
            throw this.msgError;
        }
    }

    async registerBook(title, status, author){
        try {
            const registerResult = await this.booksRepository.registerBook(title, status, author);
            console.log("Result:",registerResult);
            return registerResult;
        }catch (err) {
            console.log("cascateia o erro")
            throw this.msgError;
        }
    }

    async updateBook(id, title, status, author){
        try {
            console.log("chama BookRepository");
            const isHent = await this.detailBook(id);
            if (isHent.status){
                throw `O Livro ${isHent.title} esta Alugado e nao Pode ser Atualizado na Base de dados`;
            }
            const updateResult = await this.booksRepository.updateBook(id, title, status, author);
            return updateResult;
        }catch (err) {
            console.log(`Erro ao tentar Atualizar o Livro`)
            throw err;
        }
    }

    async removeBook(id){
        try {
            console.log("chama BookRepository");
            const isHent = await this.detailBook(id);
            if (isHent.status){
                throw `O Livro ${isHent.title} esta Alugado e nao Pode ser Removido da Base de dados`;
            }
            const removeResult = await this.booksRepository.removeBook(id);
            return removeResult;
        }catch (err) {
            console.log("Erro ao Remover Livro da Base de Dados")
            throw err;
        }
    }
}
module.exports = BooksBusiness;
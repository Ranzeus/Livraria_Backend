const BooksRepository= require('./BooksRepository')

class BooksBusiness {
    constructor() {
        this.msg ="Chama BookRepository";
        this.msgError ="Erro ao Chamar BookRepository";
        this.booksRepository = new BooksRepository();
    };

    async listBooks(data){
        try {
            let listResult = {};
            console.log("chama BookRepository")
            if (!data.id && !data.title && !data.title && !data.author){
                listResult =  this.booksRepository.listBooks();
            }else if(data.id && !data.title && !data.author){
                listResult =  await this.booksRepository.searchBooks("id", data.id);
            }else if(!data.id && data.title && !data.author){
                listResult =  await this.booksRepository.searchBooks("title", data.title);
            }else if(!data.id && !data.title && data.author) {
                listResult = await this.booksRepository.searchBooks("author", data.author);
            }else{
                listResult =  this.booksRepository.listBooks();
            }
            return listResult;

        }catch (err) {
            console.log("cascateia o erro")
            throw err;
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
            console.log("chama BookRepository");
            const isHent = await this._isHentBook(id)
            if (isHent){
                throw `O Livro ja esta Alugado`;
            }
            const hentResult = await this.booksRepository.hentBook(id);
            return hentResult;
        }catch (err) {
            console.log("cascateia o erro")
            throw err;
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

    async updateBook(id, title, author){
        try {
            console.log("chama BookRepository");
            const isHent = await this._isHentBook(id);
            if (isHent){
                throw `O Livro ${title} esta Alugado e nao Pode ser Atualizado na Base de dados`;
            }
            const updateResult = await this.booksRepository.updateBook(id, title, author);
            return updateResult;
        }catch (err) {
            console.log(`Erro ao tentar Atualizar o Livro`)
            throw err;
        }
    }

    async removeBook(id){
        try {
            console.log("chama BookRepository");
            const isHent = await this._isHentBook(id);
            if (isHent){
                throw `O Livro ${isHent.title} esta Alugado e nao Pode ser Removido da Base de dados`;
            }
            const removeResult = await this.booksRepository.removeBook(id);
            return removeResult;
        }catch (err) {
            console.log("Erro ao Remover Livro da Base de Dados")
            throw err;
        }
    }

    async _isHentBook(id){
        const isHent = await this.detailBook(id);
        return isHent.status;
    }

}
module.exports = BooksBusiness;
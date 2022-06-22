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
            if (!data.id && !data.title && !data.title && !data.author){
                listResult = await this.booksRepository.listBooks();
            }else if(data.id && !data.title && !data.author){
                listResult =  await this.booksRepository.searchBooks("id", data.id);
            }else if(!data.id && data.title && !data.author){
                listResult =  await this.booksRepository.searchBooks("title", data.title);
            }else if(!data.id && !data.title && data.author) {
                listResult = await this.booksRepository.searchBooks("author", data.author);
            }else{
                listResult = await this.booksRepository.listBooks();
            }
            return listResult;

        }catch (err) {
            throw err;
        }
    }

    async detailBook(id){
        try {
            const detailResult =  this.booksRepository.detailBook(id);
            return detailResult;
        }catch (err) {
            throw this.msgError;
        }
    }

    async hentBook(id){
        try {
            const isHent = await this._isHentBook(id)
            if (isHent){
                throw `O Livro ja esta Alugado`;
            }
            const hentResult = await this.booksRepository.hentBook(id);
            return hentResult;
        }catch (err) {
            throw err;
        }
    }

    async registerBook(data){
        try {
            const registerResult = await this.booksRepository.registerBook(data.title, data.status, data.author);
            return registerResult;
        }catch (err) {
            throw this.msgError;
        }
    }

    async updateBook(data){
        try {
            const isHent = await this._isHentBook(data.id);
            if (isHent){
                throw `O Livro esta Alugado e nao Pode ser Atualizado na Base de dados`;
            }
            const updateResult = await this.booksRepository.updateBook(data.id, data.title, data.author);
            return updateResult;
        }catch (err) {
            throw err;
        }
    }

    async removeBook(id){
        try {
            const isHent = await this._isHentBook(id);
            if (isHent){
                throw `O Livro esta Alugado e nao Pode ser Removido da Base de dados`;
            }
            const removeResult = await this.booksRepository.removeBook(id);
            return removeResult;
        }catch (err) {
            throw err;
        }
    }

    async _isHentBook(id){
        const isHent = await this.detailBook(id);
        return isHent.status;
    }

}
module.exports = BooksBusiness;
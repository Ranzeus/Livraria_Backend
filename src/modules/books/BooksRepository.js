const  { PrismaClient } = require("@prisma/client");

class BooksRepository {
    constructor() {
        this.msg ="Chama BookRepository";
        this.msgError ="Erro ao Chamar BookRepository";
        this.prismaClient = new PrismaClient();
    };

    async listBooks(){
        try {
            const listResult = await this.prismaClient.books.findMany();
            return listResult;
        }catch (err) {
            throw this.msgError;
        }
    }

    async searchBooks(key, value){
        try {
            const query = await this._mountSearchQuery(key, value);
            const listResult = await this.prismaClient.books.findMany(query);
            return listResult;
        }catch (err) {
            throw this.msgError;
        }
    }

    async detailBook(id){
        try {
            const detailResult = await this.prismaClient.books.findUnique({
                where:{
                    id,
                }
            });
            return detailResult;
        }catch (err) {
            throw "Livro Não Encontrado na Base de Dados";
        }
    }

    async hentBook(id){
        try {
            await this.prismaClient.books.update({
                where:{
                    id,
                },
                data: {
                    status:true
                }
            });
            return {message: `O Livro foi Alugado com Sucesso.`};
        }catch (err) {
            throw "Erro ao alugar o livro";
        }
    }

    async registerBook(title, status, author){
        try {
            await this.prismaClient.books.create({
                data: {
                    title,
                    status,
                    author
                }
            })
            return {message: `Livro ${title} foi cadastrado com sucesso.`};
        }catch (err) {
            throw err;
        }
    }

    async updateBook(id, title, author){
        try {
            await this.prismaClient.books.update({
                where:{
                    id,
                },
                data: {
                    title,
                    author
                }
            });
            return {message: `O livro ${title} foi atualizado com sucesso.`};
        }catch (err) {
            throw `Erro ao Tentar Atualizar o Livro ${title}.`;
        }
    }

    async removeBook(id){
        try {
            const resultDetail = await this.prismaClient.books.delete({
                where:{
                    id,
                }
            });
            return {message: 'O Livro foi Removido da Base de Dados com Sucesso.'};
        }catch (err) {
            throw this.msgError;
        }
    }

    async _mountSearchQuery(key, value){
        let where = {};
        where[`${key}`] = {
            equals: value
        }
        const query = {
            where:where
        }
        return query
    };

}
module.exports = BooksRepository;
const  { PrismaClient } = require("@prisma/client");

class BooksRepository {
    constructor() {
        this.msg ="Chama BookRepository";
        this.msgError ="Erro ao Chamar BookRepository";
        this.prismaClient = new PrismaClient();
    };

    async listBooks(id, title, status, author){ //FALTA IMPLEMENTAR A PESQUISA POR ALGUM ATRIBUTO
        try {
            const listResult = await this.prismaClient.books.findMany();
            return listResult;
        }catch (err) {
            console.log("cascateia o erro")//#########
            throw this.msgError;
        }
    }

    async detailBook(id){
        try {
            console.log("Pesquisando Livro na Base de Dados")
            const detailResult = await this.prismaClient.books.findUnique({
                where:{
                    id,
                }
            });
            return detailResult;
        }catch (err) {
            console.log("Livro Não Encontrado na Base de Dados")
            throw "Livro Não Encontrado na Base de Dados";
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
            console.log("Consultando o banco de dados");
            await this.prismaClient.books.create({
                data: {
                    title,
                    status,
                    author
                }
            })
            return {message: `Livro ${title} foi cadastrado com sucesso.`};
        }catch (err) {
            console.log("cascateia o erro do repository")
            throw err;
        }
    }

    async updateBook(id, title, status, author){
        try {
            console.log("Atualizando livro")
            await this.prismaClient.books.update({
                where:{
                    id,
                },
                data: {
                    title,
                    status,
                    author
                }
            });
            return {message: `O livro ${title} foi atualizado com sucesso.`};
        }catch (err) {
            console.log("cascateia o erro")
            throw `Erro ao Tentar Atualizar o Livro ${title}.`;
        }
    }

    async removeBook(id){
        try {
            console.log("Removendo Livro da bBase de Dados")
            const resultDetail = await this.prismaClient.books.delete({
                where:{
                    id,
                }
            });
            return 'O Livro foi Removido da Base de Dados com Sucesso.';
        }catch (err) {
            console.log("cascateia o erro")
            throw this.msgError;
        }
    }
}
module.exports = BooksRepository;
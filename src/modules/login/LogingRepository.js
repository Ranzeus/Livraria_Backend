const  { PrismaClient } = require("@prisma/client");

class LoginRepository {
    constructor() {
        this.msg ="Chama BookRepository";
        this.msgError ="Erro ao Chamar BookRepository";
        this.prismaClient = new PrismaClient();
    };

    async login(name, password){
        try {
            const loginResult = await this.prismaClient.user_login.create({
                where:{
                    cpf,
                },
                data: {
                    status:true
                }
            });

            return loginResult;
        }catch (err) {
            console.log("cascateia o erro")//#########
            throw this.msgError;
        }
    }

    async searchUser(name){
        try {
            const searchResult = await this.prismaClient.user.findMany({
                where:{
                    name
                }
            });
            return searchResult;
        }catch (err) {
            console.log("Erro ao pesquisar Usuário")
            throw this.msgError;
        }
    }

}
module.exports = LoginRepository;
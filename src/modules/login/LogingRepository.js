const  { PrismaClient } = require("@prisma/client");

class LoginRepository {
    constructor() {
        this.msg ="Chama BookRepository";
        this.msgError ="Erro ao Chamar BookRepository";
        this.prismaClient = new PrismaClient();
    };

    async searchUser(name){
        try {
            const searchResult = await this.prismaClient.user.findMany({
                where:{
                    name
                }
            });
            return searchResult;
        }catch (err) {
            throw this.msgError;
        }
    }

}
module.exports = LoginRepository;
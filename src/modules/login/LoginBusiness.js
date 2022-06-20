const LoginRepository = require("./LogingRepository");
// const TokenGenerate = require("../../utils/TokenGenerate3");
const TokenGenerate = require("../../utils/TokenGenerate");

class LoginBusiness {
    constructor() {
        this.msg ="chama LoginRepository";
        this.msgError ="Erro ao chama BookRepository";
        this.loginRepository = new LoginRepository();
        this.tokenGenerate = new TokenGenerate();
    };

    async login(data){
        try {
            console.log(this.msg);
            let listOfUsers = await this.loginRepository.searchUser(data.name);
            let user = listOfUsers[0];
            if (user && user.password === data.password) {
                const jwt = await this.tokenGenerate.generate(user);
                user.password = "";
                const response = {
                    jwt,
                    user
                }
                return response;
            }
        }catch (err) {
            console.log(this.msgError)//#########
            throw this.msgError;
        }
    }
}

module.exports = LoginBusiness;
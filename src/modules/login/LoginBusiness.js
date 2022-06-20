class LoginBusiness {
    constructor() {
        this.msg ="chama BookRepository";
        this.msgError ="Erro ao chama BookRepository";
    };

    async login(user, password){
        try {
            console.log(this.msg)//#########
            return this.msg;
        }catch (err) {
            console.log(this.msgError)//#########
            throw this.msgError;
        }
    }

    async loginCheck(user){
        try {
            console.log(this.msg)
            return this.msg;
        }catch (err) {
            console.log(this.msgError)
            throw this.msgError;
        }
    }
}

module.exports = LoginBusiness;
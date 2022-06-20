const LoginBusiness = require('./LoginBusiness')

class LoginController {

    constructor() {
        this.LoginBusiness = new LoginBusiness();
    };

    async login(req, res){
        try {
            const loginResult = await this.LoginBusiness.login(req.body);
            res.send(loginResult);
        }catch (err) {
            res.status(400).send({error: err})
        }
    }

    async loginCheck(req, res){
        try {
            const checkResult = await this.LoginBusiness.loginCheck(req.body.user);
            res.send(checkResult);
        }catch (err) {
            res.status(400).send({error: err})
        }
    }
}
module.exports = new LoginController();
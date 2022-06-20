const jwt = require('jsonwebtoken');

class TokenGenerate {
    async generate(dataToken){
       const tokenNumber =  jwt.sign({id: dataToken.cpf}, process.env.SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: 10800 // tempo de validade do token = 3h
        });

       return "Bearer "+tokenNumber
    }
}
module.exports = TokenGenerate;
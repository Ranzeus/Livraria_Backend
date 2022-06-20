const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    const  authHeader = req.headers.authorization;

    // Verifica se exite token de autenticação
    if(!authHeader){
        return res.status(401).send({error: "Nenhum token fornecido"});
    }

    const parts = authHeader.split(' ')

    //Verifico se o token tem 2 partes
    if (!parts.length === 2){
        return res.status(401).send({error: 'Erro de Token'});
    }

    const [scheme, token] = parts;

    // Verifico se a primeira parte do token esta escrito Bearer
    if (!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error: 'Token mal formatado'});
    }

    //Verificando a validade do token com jwt
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if (err){
            return res.status(401).send({error: 'Token Invalido'});
        }
        req.userId = decoded.id;
        return next();
    });

}
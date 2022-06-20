//Imports
const express = require('express');
const cors = require('cors')

//Iniciando o app
const app = express();

//Para enviar os dados em json
app.use(express.json());

//Liberar acesso de qualquer dominio
app.use(cors());

//Iniciando o BD
// mongoose.connect(
//     process.env.MONGO_URL,  // 104.131.72.37:3000
//     { useUnifiedTopology: true, useNewUrlParser: true }
// );

//Rotas
app.use("/api",require("./routes"));

//Ouvindo porta 3001
app.listen(process.env.PORT || 3001);

console.log("Aplicação Iniciada com Sucesso!");
const crypto = require("crypto");
var CryptoJS = require("crypto-js");


class Criptograph {
    constructor() {

        this.DADOS_CRIPTO = {
            algoritmo : "aes256",
            codificacao : "utf8",
            segredo : "allBot",
            tipo : "hex"
        };
    }
    async cripto (palavra){
        var ciphertext = CryptoJS.AES.encrypt(palavra, this.DADOS_CRIPTO.segredo).toString();
        return ciphertext
    }

    async descripto (palavra){
        var bytes  = CryptoJS.AES.decrypt(palavra, this.DADOS_CRIPTO.segredo);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    }
}

module.exports = Criptograph;
class TestController {
    constructor() {
        this.msg ="Olá mundo";
    };
    async test(req, res){
        try {
            res.send({message: this.msg});
        }catch (err) {
            res.status(400).send({error: err})
        }
    }
}
module.exports = new TestController();
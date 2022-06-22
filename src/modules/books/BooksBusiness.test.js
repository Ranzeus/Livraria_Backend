// jest.mock('./BooksBusiness')
const BooksBusiness = require('./BooksBusiness');

let booksBusiness = new BooksBusiness();
let data = {};
let id = null;

describe('Metodos do BooksBusiness',()=>{

    describe('listBooks',()=>{
        beforeEach(()=>{
            const data = {}
        })
        it('Lista todos os livros',async ()=>{
            booksBusiness.booksRepository.listBooks = jest.fn().mockReturnValue({});
            booksBusiness.booksRepository.searchBooks = jest.fn().mockReturnValue({});
            await booksBusiness.listBooks(data);
            expect(booksBusiness.booksRepository.listBooks).toBeCalledTimes(1);
            expect(booksBusiness.booksRepository.searchBooks).not.toBeCalled();
        })

        it('Lista todos os Livros com um id especifico',async ()=>{
            data = {
                id: 1234
            }
            booksBusiness.booksRepository.listBooks = jest.fn().mockReturnValue({});
            booksBusiness.booksRepository.searchBooks = jest.fn().mockReturnValue({});
            await booksBusiness.listBooks(data);
            expect(booksBusiness.booksRepository.listBooks).not.toBeCalled();
            expect(booksBusiness.booksRepository.searchBooks).toBeCalledTimes(1);
        })

        it('Lista todos os Livros com um titulo especifico',async ()=>{
            data = {
                title: "O Principe"
            }
            booksBusiness.booksRepository.listBooks = jest.fn().mockReturnValue({});
            booksBusiness.booksRepository.searchBooks = jest.fn().mockReturnValue({});
            await booksBusiness.listBooks(data);
            expect(booksBusiness.booksRepository.listBooks).not.toBeCalled();
            expect(booksBusiness.booksRepository.searchBooks).toBeCalledTimes(1);
        })

        it('Lista todos os Livros com um autor especifico',async ()=>{
            data = {
                author: "Nicolau Maquiavel"
            }
            booksBusiness.booksRepository.listBooks = jest.fn().mockReturnValue({});
            booksBusiness.booksRepository.searchBooks = jest.fn().mockReturnValue({});
            await booksBusiness.listBooks(data);
            expect(booksBusiness.booksRepository.listBooks).not.toBeCalled();
            expect(booksBusiness.booksRepository.searchBooks).toBeCalledTimes(1);
        })

        it('Lista todos os Livros em caso de pesquisa por mais de uma caracteristica',async ()=>{
            data = {
                id: 1234,
                title: "O Principe",
                author: "Nicolau Maquiavel"
            }
            booksBusiness.booksRepository.listBooks = jest.fn().mockReturnValue({});
            booksBusiness.booksRepository.searchBooks = jest.fn().mockReturnValue({});
            await booksBusiness.listBooks(data);
            expect(booksBusiness.booksRepository.listBooks).toBeCalledTimes(1);
            expect(booksBusiness.booksRepository.searchBooks).not.toBeCalled();
        })

        it('Erro ao listar todos os livros',async ()=>{
            data = {
                id: 1234,
                title: "O Principe",
                author: "Nicolau Maquiavel"
            }
            booksBusiness.booksRepository.listBooks = jest.fn().mockImplementation(()=>{
                throw new Error('Error');
            });
            booksBusiness.booksRepository.searchBooks = jest.fn().mockReturnValue({});
            try {
                await booksBusiness.listBooks(data);
                expect(booksBusiness.booksRepository.listBooks).toBeCalledTimes(1);
                expect(booksBusiness.booksRepository.searchBooks).not.toBeCalled();
            }catch (e) {
                expect(booksBusiness.booksRepository.listBooks).toThrow();
            }
        })

        it('Erro ao listar todos os Livros com um autor especifico',async ()=>{
            data = {
                author: "Nicolau Maquiavel"
            }
            booksBusiness.booksRepository.listBooks = jest.fn().mockReturnValue({});
            booksBusiness.booksRepository.searchBooks = jest.fn().mockImplementation(()=>{
                throw new Error('Error');
            });
            try {
                await booksBusiness.listBooks(data);
                expect(booksBusiness.booksRepository.listBooks).not.toBeCalled();
                expect(booksBusiness.booksRepository.searchBooks).toBeCalledTimes(1);
            }catch (e) {
                expect(booksBusiness.booksRepository.searchBooks).toThrow();
            }
        })
    })

    describe('hentBooks',  ()=>{
        beforeEach(()=>{
            const id = {}
        })

        it('Aluga um livro especifico',async ()=>{
            booksBusiness._isHentBook = jest.fn().mockReturnValue(false);
            booksBusiness.booksRepository.hentBook = jest.fn().mockReturnValue("OK");
            await booksBusiness.hentBook(id);
            expect(booksBusiness._isHentBook).toBeCalledTimes(1);
            expect(booksBusiness.booksRepository.hentBook).toBeCalledTimes(1);
        })

        it('Erro ao alugar um livro alugado',async ()=>{
            id = 1234;
            booksBusiness._isHentBook = jest.fn().mockReturnValue(true);
            booksBusiness.booksRepository.hentBook = jest.fn().mockReturnValue("OK");
            try {
                await booksBusiness.hentBook(id);
                expect(booksBusiness._isHentBook).toBeCalledTimes(1);
                expect(booksBusiness.booksRepository.hentBook).not.toBeCalled();
            }catch (e) {
                expect(e).toEqual(`O Livro ja esta Alugado`);
            }

        })
    })

    describe('updateBook',  ()=>{
        beforeEach(()=>{
            const data = {}
        })

        it('Atualiza um livro especifico',async ()=>{
            booksBusiness._isHentBook = jest.fn().mockReturnValue(false);
            booksBusiness.booksRepository.updateBook = jest.fn().mockReturnValue("OK");
            await booksBusiness.updateBook(data);
            expect(booksBusiness._isHentBook).toBeCalledTimes(1);
            expect(booksBusiness.booksRepository.updateBook).toBeCalledTimes(1);
        })

        it('Erro ao atualizar um livro alugado',async ()=>{
            data = {
                id: 1234,
                title: 'A arte da guerra'
            }
            booksBusiness._isHentBook = jest.fn().mockReturnValue(true);
            booksBusiness.booksRepository.updateBook = jest.fn().mockReturnValue("OK");
            try {
                await booksBusiness.updateBook(data);
                expect(booksBusiness._isHentBook).toBeCalledTimes(1);
                expect(booksBusiness.booksRepository.updateBook).not.toBeCalled();
            }catch (e) {
                expect(e).toEqual(`O Livro esta Alugado e nao Pode ser Atualizado na Base de dados`);
            }

        })
    })

    describe('removeBook',  ()=>{
        beforeEach(()=>{
            const id = {}
        })

        it('Atualiza um livro especifico',async ()=>{
            booksBusiness._isHentBook = jest.fn().mockReturnValue(false);
            booksBusiness.booksRepository.removeBook = jest.fn().mockReturnValue("OK");
            await booksBusiness.removeBook(id);
            expect(booksBusiness._isHentBook).toBeCalledTimes(1);
            expect(booksBusiness.booksRepository.removeBook).toBeCalledTimes(1);
        })

        it('Erro ao atualizar um livro alugado',async ()=>{
            id = 1234,
            booksBusiness._isHentBook = jest.fn().mockReturnValue(true);
            booksBusiness.booksRepository.removeBook = jest.fn().mockReturnValue("OK");
            try {
                await booksBusiness.removeBook(id);
                expect(booksBusiness._isHentBook).toBeCalledTimes(1);
                expect(booksBusiness.booksRepository.removeBook).not.toBeCalled();
            }catch (e) {
                expect(e).toEqual(`O Livro esta Alugado e nao Pode ser Removido da Base de dados`);
            }

        })
    })

})
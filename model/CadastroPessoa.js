import pessoaDAO from "../DAO/cadastroDAO.js"; 

export default class Pessoa {
    #nome;
    #cpf;
    #telefone;
    #email;
    #senha;

    constructor(nome, cpf, telefone, email, senha) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#telefone = telefone;
        this.#email = email;
        this.#senha = senha;
    }

    get nome() {
        return this.#nome;
    }

    get cpf() {
        return this.#cpf;
    }

    get telefone() {
        return this.#telefone;
    }

    get email() {
        return this.#email;
    }

    get senha() {
        return this.#senha;
    }

    toString() {
        return `Nome: ${this.#nome}
    CPF: ${this.#cpf}
    Telefone: ${this.#telefone}
    Email: ${this.#email}
    `;
    }

    toJSON() {
        return {
            nome: this.#nome,
            cpf: this.#cpf,
            telefone: this.#telefone,
            email: this.#email,
            senha: this.#senha
        };
    }

    async incluir() {
        const pessoaDao = new pessoaDAO(); 

        const pessoaData = {
            nome: this.#nome,
            cpf: this.#cpf,
            telefone: this.#telefone,
            email: this.#email,
            senha: this.#senha
        };

        await pessoaDao.gravar(pessoaData);
    }

    async alterar() {
        const pessoaDao = new pessoaDAO();
        await pessoaDao.alterar(this);
    }

    async excluir() {
        const pessoaDao = new pessoaDAO();
        await pessoaDao.excluir(this);
    }

    async consulta(termoBusca) {
        const pessoaDao = new pessoaDAO();
        return await pessoaDao.consulta(termoBusca);
    }
}

import partidoDAO from "../DAO/cadastroDAO.js";

export default class Partido {
    #nome;
    #sigla;
    #descricao;

    constructor(nome, sigla, descricao) {
        this.#nome = nome_partido;
        this.#sigla = sigla;
        this.#descricao = descricao;
    }

    get nome_partido() {
        return this.#nome;
    }

    get sigla() {
        return this.#sigla;
    }

    get descricao() {
        return this.#descricao;
    }

    toString() {
        return `Nome do Partido: ${this.#nome}
    Sigla: ${this.#sigla}
    Descrição: ${this.#descricao}
    `;
    }

    toJSON() {
        return {
            nome_partido: this.#nome,
            sigla: this.#sigla,
            descricao: this.#descricao
        };
    }

    async incluir() {
        const partDao = new partidoDAO();

        const partidoData = {
            nome_partido: this.#nome,
            sigla: this.#sigla,
            descricao: this.#descricao
        };

        await partDao.gravar(partidoData);
    }

    async alterar() {
        const partDao = new partidoDAO();
        await partDao.alterar(this);
    }

    async excluir() {
        const partDao = new partidoDAO();
        await partDao.excluir(this);
    }

    async consulta(termoBusca) {
        const partDao = new partidoDAO();
        return await partDao.consulta(termoBusca);
    }
}

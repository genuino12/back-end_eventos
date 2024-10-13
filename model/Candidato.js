import candidatoDAO from "../DAO/cadastroDAO.js"; 

export default class Candidato {
    #nomeCandidato;
    #partido;
    #numero;

    constructor(nomeCandidato, partido, numero) {
        this.#nomeCandidato = nomeCandidato;
        this.#partido = partido;
        this.#numero = numero;
    }

    get nome_candidato() {
        return this.#nomeCandidato;
    }

    get partido() {
        return this.#partido;
    }

    get descricao() {
        return this.#numero;
    }

    toString() {
        return `Nome do Candidato: ${this.#nomeCandidato}
    Partido: ${this.#partido}
    Descrição: ${this.#numero}
    `;
    }

    toJSON() {
        return {
            nome_candidato: this.#nomeCandidato,
            partido: this.#partido,
            descricao: this.#numero
        };
    }

    async incluir() {
        const candDao = new candidatoDAO(); // Use o DAO apropriado para candidatos

        const candidatoData = {
            nome_candidato: this.#nomeCandidato,
            partido: this.#partido,
            descricao: this.#numero
        };

        await candDao.gravar(candidatoData);
    }

    async alterar() {
        const candDao = new candidatoDAO();
        await candDao.alterar(this);
    }

    async excluir() {
        const candDao = new candidatoDAO();
        await candDao.excluir(this);
    }

    async consulta(termoBusca) {
        const candDao = new candidatoDAO();
        return await candDao.consulta(termoBusca);
    }
}

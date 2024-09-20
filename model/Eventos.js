import eventoDAO from "../DAO/eventosDAO.js";

export default class eventos {
    #nome_evento
    #descricao
    #data_hora
    #local
    #preco
    #Ingressos

    constructor(nome_evento, descricao, data_hora, local, preco, ingressos) {
        this.#nome_evento = nome_evento
        this.#descricao = descricao
        this.#data_hora = data_hora
        this.#local = local
        this.#preco = preco
        this.#Ingressos = ingressos
    }
    get nome_evento() {
        return this.#nome_evento
    }
    get descricao() {
        return this.#descricao
    }
    get data_hora() {
        return this.#data_hora
    }
    get local() {
        return this.#local
    }
    get preco() {
        return this.#preco
    }
    get ingressos() {
        return this.#Ingressos
    }
    toString() {
        return `Nome do Evento: ${this.#nome_evento}
    Descrição: ${this.#descricao}
    Data e horario do evento: ${this.#data_hora}
    local do evento: ${this.#local}
    preço do evento: ${this.#preco}
    Ingressos disponiveis: ${this.#Ingressos}   
    `
    }

    async incluir() {
        const eveDao = new eventoDAO();

        const eventos = {
            nome: this.#nome_evento,
            descricao: this.#descricao,
            data_hora: this.#data_hora,
            local: this.#local,
            preco: this.#preco,
            ingressos: this.#Ingressos
        };

        await eveDao.gravar(eventos);
    }

    async alterar() {
        const eveDao = new eventoDAO();
        await eveDao.alterar(this);
    }

    async excluir() {
        const eveDao = new eventoDAO();
        await eveDao.excluir(this);
    }

    async consultar(termoBusca) {
        const eveDao = new eventoDAO();
        return await eveDao.consultar(termoBusca);
    }
}
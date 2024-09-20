import conectar from "./conexao.js";
import evento from "../model/Eventos.js";

export default class eventoDAO {

    constructor() {
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS eventos (
        id_eventos INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        descricao VARCHAR(200) NOT NULL,
        data_hora DATETIME NOT NULL,
        local_evento VARCHAR(100) NOT NULL,
        preco DECIMAL(10,2) NOT NULL,
        ingressos INT NOT NULL
        )`;
            //await conexao.execute(sql);
            console.log("banco de dados iniciado com sucesso!");
        } catch (erro) {
            console.log("o banco de dados não pode ser iniciado!");
        };

    }
    async gravar(evento) {
        try {
            const conexao = await conectar();
            const sql = `INSERT INTO eventos (nome, descricao, data_hora, local_evento, preco, ingressos) VALUES ('${evento.nome}','${evento.descricao}','${evento.data_hora}','${evento.local}',${evento.preco},${evento.ingressos});`;
            await conexao.execute(sql);
        } catch (erro) {
            console.error("Erro ao incluir evento!", erro);
            throw erro;
        }
    }


    async alterar(eventos) {
        if (eventos instanceof evento) {
            const conexao = await conectar();
            const sql = `UPDATE eventos SET nome=?, descricao=?,data_hora=?, local=?, preco=?, ingressos=? WHERE id_eventos =?;`;
            const parametros = [
                eventos.nome,
                eventos.descricao,
                eventos.data_hora,
                eventos.local,
                eventos.preco,
                eventos.ingressos,
                eventos.id_eventos
            ];
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }
    async excluir(eventos) {
        if (eventos instanceof evento) {
            const conexao = await conectar();
            const sql = `DELETE FROM eventos WHERE id_eventos = ?;`;
            const parametros = [
                eventos.id_eventos
            ];
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }
    async consultar(termoBusca) {
        let sql = "";
        const parametros = [];
        if (termoBusca) {
            sql = `SELECT * FROM eventos WHERE id_eventos = ? ORDER BY NOME;`;
            parametros.push(termoBusca);
        }
        else {
            sql = `SELECT * FROM eventos ORDER BY NOME;`;
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql);
        let listaEvento = [];
        for (const registro of registros) {
            const evento = new evento(
                registro.id_eventos,
                registro.nome,
                registro.descricao,
                registro.data_hora,
                registro.local,
                registro.preco,
                registro.ingressos
            );
            listaEvento.push(evento);
        }
        await global.poolConexoes.releaseConnection(conexao);
        return listaEvento;
    }
}
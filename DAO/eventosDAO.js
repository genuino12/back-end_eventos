import conectar from "./conexao.js";
import evento from "../model/Eventos.js";

export default class eventoDAO {
    constructor() {}

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE eventos (
    id_eventos INT(11) NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    descricao VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    data_hora DATETIME NOT NULL,
    local_evento VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    ingressos INT(11) NOT NULL,
    PRIMARY KEY (id_eventos)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

            )`;
            await conexao.execute(sql);
            console.log("Banco de dados iniciado com sucesso!");
        } catch (erro) {
            console.log("O banco de dados não pode ser iniciado!", erro);
        }
    }

    async gravar(evento) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `INSERT INTO eventos (nome, descricao, data_hora, local_evento, preco, ingressos) VALUES (?, ?, ?, ?, ?, ?);`;
            const parametros = [
                evento.nome,
                evento.descricao,
                evento.data_hora,
                evento.local,
                evento.preco,
                evento.ingressos
            ];
            await conexao.execute(sql, parametros);
        } catch (erro) {
            console.error("Erro ao incluir evento!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();  
        }
    }

    async alterar(eventos) {
        if (eventos instanceof evento) {
            let conexao;
            try {
                conexao = await conectar();
                const sql = `UPDATE eventos SET nome=?, descricao=?, data_hora=?, local_evento=?, preco=?, ingressos=? WHERE id_eventos = ?;`;
                const parametros = [
                    eventos.nome,
                    eventos.descricao,
                    eventos.data_hora,
                    eventos.local_evento,
                    eventos.preco,
                    eventos.ingressos,
                    eventos.id_eventos
                ];
                await conexao.execute(sql, parametros);
            } catch (erro) {
                console.error("Erro ao alterar evento!", erro);
                throw erro;
            } finally {
                if (conexao) conexao.release();  // Libera a conexão corretamente
            }
        }
    }

    async excluir(eventos) {
        if (eventos instanceof evento) {
            let conexao;
            try {
                conexao = await conectar();
                const sql = `DELETE FROM eventos WHERE id_eventos = ?;`;
                const parametros = [eventos.id_eventos];
                await conexao.execute(sql, parametros);
            } catch (erro) {
                console.error("Erro ao excluir evento!", erro);
                throw erro;
            } finally {
                if (conexao) conexao.release(); 
            }
        }
    }

    async consulta(termoBusca) {
        let conexao;
        try {
            conexao = await conectar();
            let sql = "";
            const parametros = [];

            if (termoBusca) {
                sql = `SELECT * FROM eventos WHERE id_eventos = ? ORDER BY nome;`;
                parametros.push(termoBusca);
            } else {
                sql = `SELECT * FROM eventos ORDER BY nome;`;
            }

            const [registros] = await conexao.execute(sql, parametros);
            const listaEvento = registros.map(registro => new evento(
                registro.id_eventos,
                registro.nome,
                registro.descricao,
                registro.data_hora,
                registro.local_evento,
                registro.preco,
                registro.ingressos
            ));
            return listaEvento;
        } catch (erro) {
            console.error("Erro ao consultar eventos!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release(); 
        }
    }
}

import conectar from "./conexao.js";
import Partido from "../model/Partido.js"; 
import Candidato from "../model/Candidato.js"; 
import CadastroPessoa from "../model/CadastroPessoa.js";

export default class CadastroDAO {
    constructor() {}

    async init() {
        try {
            const conexao = await conectar();

            // Criação da tabela para partidos
            const sqlPartidos = `CREATE TABLE partidos (
                id_partido INT(11) NOT NULL AUTO_INCREMENT,
                nome VARCHAR(100) NOT NULL,
                sigla VARCHAR(10) NOT NULL,
                numero_registro INT(11) NOT NULL,
                PRIMARY KEY (id_partido)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`;

            // Criação da tabela para candidatos
            const sqlCandidatos = `CREATE TABLE candidatos (
    id_candidato INT(11) NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    id_partido INT(11) NOT NULL,
    numero_candidato INT(11) NOT NULL,
    PRIMARY KEY (id_candidato),
    FOREIGN KEY (id_partido) REFERENCES partidos(id_partido)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`;
const sqlCadastroPessoas =`CREATE TABLE pessoas (
    id_pessoa INT(11) NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_pessoa)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;


            await conexao.execute(sqlPartidos);
            await conexao.execute(sqlCandidatos);
            await conexao.execute(sqlCadastroPessoas);

            console.log("Tabelas de partidos e candidatos criadas com sucesso!");
        } catch (erro) {
            console.log("Erro ao criar tabelas!", erro);
        }
    }

    // Método para gravar um partido
    async gravarPartido(partido) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `INSERT INTO partidos (nome, sigla, numero_registro) VALUES (?, ?, ?);`;
            const parametros = [partido.nome, partido.sigla, partido.numero_registro];
            await conexao.execute(sql, parametros);
        } catch (erro) {
            console.error("Erro ao incluir partido!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();
        }
    }

    // Método para gravar um candidato
    async gravarCandidato(candidato) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `INSERT INTO candidatos (nome, id_partido, numero_candidato) VALUES (?, ?, ?);`;
            const parametros = [candidato.nome, candidato.id_partido, candidato.numero_candidato];
            await conexao.execute(sql, parametros);
        } catch (erro) {
            console.error("Erro ao incluir candidato!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();
        }
    }
    async gravarCadastroPessoa(pessoa) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `INSERT INTO pessoas (nome, cpf, telefone, email, senha) VALUES (?, ?, ?, ?, ?);`;
           
            const parametros = [pessoa.nome, pessoa.cpf, pessoa.telefone, pessoa.email, pessoa.senha];
            await conexao.execute(sql, parametros);
        } catch (erro) {
            console.error("Erro ao incluir pessoa!", erro);
            throw erro; 
        } finally {
            if (conexao) conexao.release(); 
        }
    }
    


    // Método para alterar um partido
    async alterarPartido(partido) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `UPDATE partidos SET nome=?, sigla=?, numero_registro=? WHERE id_partido = ?;`;
            const parametros = [partido.nome, partido.sigla, partido.numero_registro, partido.id_partido];
            await conexao.execute(sql, parametros);
        } catch (erro) {
            console.error("Erro ao alterar partido!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();
        }
    }

    // Método para alterar um candidato
    async alterarCandidato(candidato) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `UPDATE candidatos SET nome=?, id_partido=?, numero_candidato=? WHERE id_candidato = ?;`;
            const parametros = [candidato.nome, candidato.id_partido, candidato.numero_candidato, candidato.id_candidato];
            await conexao.execute(sql, parametros);
        } catch (erro) {
            console.error("Erro ao alterar candidato!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();
        }
    }
    //alterar pessoa
    async alterarCadastroPessoa(pessoa) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `UPDATE pessoas SET nome = ?, cpf = ?, telefone = ?, email = ?, senha = ? WHERE id_pessoa = ?;`;
            const parametros = [pessoa.nome, pessoa.cpf, pessoa.telefone, pessoa.email, pessoa.senha, pessoa.id_pessoa];
            await conexao.execute(sql, parametros);
        } catch (erro) {
            console.error("Erro ao alterar pessoa!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();
        }
    }
    
    // Método para excluir um partido
    async excluirPartido(partido) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `DELETE FROM partidos WHERE id_partido = ?;`;
            const parametros = [partido.id_partido];
            await conexao.execute(sql, parametros);
        } catch (erro) {
            console.error("Erro ao excluir partido!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();
        }
    }

    // Método para excluir um candidato
    async excluirCandidato(candidato) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `DELETE FROM candidatos WHERE id_candidato = ?;`;
            const parametros = [candidato.id_candidato];
            await conexao.execute(sql, parametros);
        } catch (erro) {
            console.error("Erro ao excluir candidato!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();
        }
    }
    //excluir pessoa
    async excluirPessoa(id) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `DELETE FROM pessoas WHERE id_pessoa = ?;`;
            await conexao.execute(sql, [id]);
        } catch (erro) {
            console.error("Erro ao excluir pessoa!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();
        }
    }
    

    // Método para consultar partidos
    async consultaPartidos(termoBusca) {
        let conexao;
        try {
            conexao = await conectar();
            let sql = "";
            const parametros = [];

            if (termoBusca) {
                sql = `SELECT * FROM partidos WHERE id_partido = ? ORDER BY nome;`;
                parametros.push(termoBusca);
            } else {
                sql = `SELECT * FROM partidos ORDER BY nome;`;
            }

            const [registros] = await conexao.execute(sql, parametros);
            return registros.map(registro => new Partido(
                registro.id_partido,
                registro.nome,
                registro.sigla,
                registro.numero_registro
            ));
        } catch (erro) {
            console.error("Erro ao consultar partidos!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();
        }
    }

    // Método para consultar candidatos
    async consultaCandidatos(termoBusca) {
        let conexao;
        try {
            conexao = await conectar();
            let sql = "";
            const parametros = [];

            if (termoBusca) {
                sql = `SELECT * FROM candidatos WHERE id_candidato = ? ORDER BY nome;`;
                parametros.push(termoBusca);
            } else {
                sql = `SELECT * FROM candidatos ORDER BY nome;`;
            }

            const [registros] = await conexao.execute(sql, parametros);
            return registros.map(registro => new Candidato(
                registro.id_candidato,
                registro.nome,
                registro.id_partido,
                registro.numero_candidato
            ));
        } catch (erro) {
            console.error("Erro ao consultar candidatos!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();
        }
    }
    async consultarPessoas() {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `SELECT * FROM pessoas;`;
            const [resultados] = await conexao.execute(sql);
            return resultados; // Retorna todos os registros
        } catch (erro) {
            console.error("Erro ao consultar pessoas!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();
        }
    }
    //consulta pessoa
    async consultarPessoaPorId(id) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `SELECT * FROM pessoas WHERE id_pessoa = ?;`;
            const [resultados] = await conexao.execute(sql, [id]);
            return resultados[0]; 
        } catch (erro) {
            console.error("Erro ao consultar pessoa!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();
        }
    }
    
}

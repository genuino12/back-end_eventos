import Partido from "../model/Partido.js";

export default class cadastroctrl {

    // Método para cadastrar um novo partido
    cadastrar(requisicao, resposta) {
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const { nome_partido, sigla, descricao } = requisicao.body;

            // Validação dos dados do partido
            if (nome_partido && sigla && descricao) {
                const partido = new Partido(nome_partido, sigla, descricao);

                partido.incluir()
                    .then(() => {
                        resposta.status(201).json({
                            "Status": true,
                            "mensagem": "Partido cadastrado com sucesso."
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "Status": false,
                            "mensagem": "Erro ao cadastrar partido: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "Status": false,
                    "mensagem": "Requisição inválida, informe todos os dados do partido."
                });
            }
        } else {
            resposta.status(405).json({
                "Status": false,
                "mensagem": "Método não permitido."
            });
        }
    }

    // Método para alterar um partido existente
    alterar(requisicao, resposta) {
        if ((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is("application/json")) {
            const { id_partido, nome_partido, sigla, descricao } = requisicao.body;

            // Validação dos dados do partido
            if (id_partido && nome_partido && sigla && descricao) {
                const partido = new Partido(nome_partido, sigla, descricao);
                partido.id_partido = id_partido; // Adicionando o ID ao objeto

                partido.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            "Status": true,
                            "mensagem": "Partido alterado com sucesso."
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "Status": false,
                            "mensagem": "Erro ao alterar partido: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "Status": false,
                    "mensagem": "Requisição inválida, informe todos os dados do partido."
                });
            }
        } else {
            resposta.status(405).json({
                "Status": false,
                "mensagem": "Método não permitido."
            });
        }
    }

    // Método para excluir um partido
    excluir(requisicao, resposta) {
        if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
            const { id_partido } = requisicao.body;

            // Validação do ID do partido
            if (id_partido) {
                const partido = new Partido();
                partido.id_partido = id_partido; // Adicionando o ID ao objeto

                partido.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "Status": true,
                            "mensagem": "Partido excluído com sucesso."
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "Status": false,
                            "mensagem": "Erro ao excluir partido: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "Status": false,
                    "mensagem": "Requisição inválida, informe o ID do partido."
                });
            }
        } else {
            resposta.status(405).json({
                "Status": false,
                "mensagem": "Método não permitido."
            });
        }
    }

    // Método para consultar partidos
    consulta(requisicao, resposta) {
        const termoBusca = requisicao.params.termoBusca || "";
        
        if (requisicao.method === "GET") {
            const partido = new Partido();

            partido.consulta(termoBusca)
                .then((partidos) => {
                    resposta.status(200).json({
                        "Status": true,
                        "ListaDePartidos": partidos
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "Status": false,
                        "mensagem": "Erro ao consultar partidos: " + erro.message
                    });
                });
        } else {
            resposta.status(405).json({
                "Status": false,
                "mensagem": "Método não permitido."
            });
        }
    }
}

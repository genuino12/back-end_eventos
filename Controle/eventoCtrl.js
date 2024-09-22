import eventos from "../model/Eventos.js";

export default class eventoctrl {

    gravar(requisicao, resposta) {
        if (requisicao.method == "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const { nome_evento, descricao, data_hora, local, preco, ingressos } = dados;

            if (nome_evento && descricao && data_hora && local && preco && ingressos) {
                const evento = new eventos(nome_evento, descricao, data_hora, local, preco, ingressos);

                evento.incluir().then(() => {
                    resposta.status(201).json({
                        "Status": true,
                        "mensagem": "Evento Incluído com Sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "Status": false,
                        "mensagem": "Erro ao Incluir Evento: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "Status": false,
                    "mensagem": "Requisição inválida, informe todos os dados do evento."
                });
            }
        } else {
            resposta.status(405).json({
                "Status": false,
                "mensagem": "Método não permitido."
            });
        }
    };

    alterar(requisicao, resposta) {
        if ((requisicao.method == "PUT" || requisicao.method == "PATCH") && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const { nome_evento, descricao, data_hora, local, preco, ingressos } = dados;

            if (nome_evento && descricao && data_hora && local && preco && ingressos) {
                const evento = new eventos(nome_evento, descricao, data_hora, local, preco, ingressos);

                evento.alterar().then(() => {
                    resposta.status(201).json({
                        "Status": true,
                        "mensagem": "Evento alterado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "Status": false,
                        "mensagem": "Erro ao alterar evento: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "Status": false,
                    "mensagem": "Requisição inválida, informe todos os dados do evento."
                });
            }
        } else {
            resposta.status(405).json({
                "Status": false,
                "mensagem": "Método não permitido."
            });
        }
    };

    excluir(requisicao, resposta) {
        if (requisicao.method == "DELETE" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const id_eventos = dados.id_eventos;

            if (id_eventos) {
                const evento = new eventos(id_eventos);

                evento.excluir().then(() => {
                    resposta.status(201).json({
                        "Status": true,
                        "mensagem": "Evento excluído com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "Status": false,
                        "mensagem": "Erro ao excluir evento: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "Status": false,
                    "mensagem": "Requisição inválida, informe o ID do evento."
                });
            }
        } else {
            resposta.status(405).json({
                "Status": false,
                "mensagem": "Método não permitido."
            });
        }
    }

    consulta(requisicao, resposta){
        const termoBusca = requisicao.params.termoBusca;
        if(!termoBusca){
            termoBusca = "";
        }

        if (requisicao.method == "GET"){
            const evento = eventos();
            evento.consulta(termoBusca).then((evento) => {
                return resposta.status(200).json({
                    "Status": true,
                    "ListaDeEventos": evento
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    "Status": false,
                    "mensagem": "Erro ao Consulta Evento: " + erro.message
                });
            });
    }
}
}
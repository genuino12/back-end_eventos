import eventos from "../model/Eventos.js";

export default class eventoctrl{
    gravar(requisicao,resposta){ 
        if(requisicao.method == "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const nome_evento = dados.nome_evento;
            const descricao = dados.descricao;
            const data_hora = dados.data_hora;
            const local = dados.local;
            const preco = dados.preco;
            const ingressos = dados.ingressos;

            if(nome_evento && descricao && data_hora && local && preco && ingressos){
                const evento = new eventos(nome_evento,descricao,data_hora,local,preco,ingressos);

                evento.incluir().then(() => {
                    resposta.status(201).json({
                 "Status": true,
                "mensagem": "Evento Incluído com Sucesso"
                })
                }).catch((erro) => {
                    resposta.status(500).json({
                "Status": false,
                "mensagem": "Erro ao Incluir Evento" + erro.message
                    })
                });
            }
        }else{
            resposta.status(405).json({
                "Status": false,
                "mensagem": "Requisição Invalida, informe todos dados do evento"
            })
        }
    };
}

    alterar(requisicao,resposta){
        if(requisicao.method == "PUT" || requisicao.method == "PATCH" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const nome_evento = dados.nome_evento;
            const descricao = dados.descricao;
            const data_hora = dados.data_hora;
            const local = dados.local;
            const preco = dados.preco;
            const ingressos = dados.ingressos;

            if(nome_evento && descricao && data_hora && local && preco && ingressos){
                const evento = new eventos(nome_evento,descricao,data_hora,local,preco,ingressos);

                evento.alterar().then(() => {
                    resposta.status(201).json({
                 "Status": true,
                "mensagem": "Evento alterado com Sucesso"
                    });
            }).catch((erro) => {
                resposta.status(500).json({
            "Status": false,
            "mensagem": "Erro ao Incluir Evento" + erro.message
                })
            });
        }
        else{
            resposta.status(400).json({
                "Status": false,
                "mensagem": "Requisição Invalida, informe todos dados do evento"
        });
        }
    }else{
        resposta.status(405).json({
            "Status": false,
            "mensagem": "Requisição Invalida, informe todos dados do evento"
        });
    }
}
    excluir(requisicao,resposta){
        if(requisicao.method == "Delete" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const codigo = dados.nome_evento;
    };
}

    consulta(requisicao,resposta){};
   

import evento from "../model/Eventos.js";
export default class eventoctrl{
    gravar(requisicao,resposta){ 
        if(requisicao.method == "Post" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const nome_evento = dados.nome_evento;
            const descricao = dados.descricao;
            const data_hora = dados.data_hora;
            const local = dados.local;
            const preco = dados.preco;
            const ingressos = dados.ingressos;

            if(nome_evento && descricao && data_hora && local && preco && ingressos){
                const evento = new evento()
            }
        }else{
            resposta.status(405).json({
                "Status": false,
                "mensagem": "Requisição Invalida",
            })
        }
    };

    alterar(requisicao,resposta){};

    excluir(requisicao,resposta){};

    consulta(requisicao,resposta){};
}
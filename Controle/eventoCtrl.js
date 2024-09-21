export default class eventoctrl{
    gravar(requisicao,resposta){ 
        if(requisicao.method == "Post" && requisicao.is("application/json")){
            const dados = requisicao.body;
            
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
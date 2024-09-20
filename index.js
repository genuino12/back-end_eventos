import evento from "./model/Eventos.js";

const novoevento = new evento("evento x", "descrição x", "06/09/2024 14:43", "local x", 20.00, 200);

novoevento.incluir().then(() => {
    console.log("evento incuido com sucesso!!!");
}).catch((erro) => {
    console.log("erro ao incluir evento!" + erro);
});




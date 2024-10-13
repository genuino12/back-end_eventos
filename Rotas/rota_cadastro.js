import { Router } from 'express';
import cadastroCtrl from '../Controle/cadastroCtrl.js';  

const rota_partido = Router();
const ctrlPartido = new cadastroCtrl(); 

// Rotas para gerenciar partidos
rota_partido.get("/", ctrlPartido.consulta)
    .get("/:termoBusca", ctrlPartido.consulta) 
    .post("/", ctrlPartido.gravar) 
    .put("/", ctrlPartido.alterar) 
    .patch("/", ctrlPartido.alterar) 
    .delete("/", ctrlPartido.excluir);

export default rota_partido;

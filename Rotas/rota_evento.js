import {Router} from 'express';
import eventoctrl from '../Controle/eventoCtrl.js';

const rota_evento = Router();
const ctrlevento = new eventoctrl();


rota_evento.get("/", ctrlevento.consulta)
.get("/:termoBusca", ctrlevento.consulta)
.post("/", ctrlevento.gravar)
.put("/", ctrlevento.alterar)
.patch("/",ctrlevento.alterar)
.delete("/", ctrlevento.excluir);

export default rota_evento;
import express from "express";
import rota_evento from "./Rotas/rota_evento.js";
import cors from "cors";

const app =  express();
const host = "127.0.0.1";
const porta = 4000; 

app.use(cors({
    origin: "*",
}));
app.use(express.json());
app.use('/evento', rota_evento);

app.listen(porta,host, () => {
console.log(`Servidor Iniciado em http://${host}:${porta}`);
});
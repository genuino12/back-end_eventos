import express from "express";
import rota_evento from "./Rotas/rota_cadastro.js";
import cors from "cors";

const app =  express();
const host = "127.0.0.1";
const porta = 3000; 

app.use(cors({
    origin: "*",
}));
app.use(express.json());
app.use('/evento', rota_evento);

app.listen(porta,host, () => {
console.log(`Servidor Iniciado em http://${host}:${porta}`);
});
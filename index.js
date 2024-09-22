import express from "express";
import rota_evento from "./Rotas/rota_evento.js";

const app =  express();
const host = "127.0.0.1";
const porta = 4000; 


app.use(express.json());
app.use('/evetno', rota_evento);

app.listen(porta,host, () => {
console.log(`Servidor Iniciado em https://${host}:${porta}`);
});
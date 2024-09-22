import express from "express";

const app =  express();
const host = "127.0.0.1";
const porta = 4000; 


app.use(express.json());

app.listen(porta,host, () => {
console.log(`Servidor Iniciado em http://${host}:${porta}`);
});